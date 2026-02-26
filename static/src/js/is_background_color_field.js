/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _lt } from "@web/core/l10n/translation";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { Component, onMounted, onPatched, useRef } from "@odoo/owl";


export class IsBackgroundColorField extends Component {

    setup() {
        this.rootRef = useRef("root");
        onMounted(() => this._applyColor());
        onPatched(() => this._applyColor());
    }

    /**
     * Retourne le mapping couleur depuis les options du widget.
     * Format attendu dans le XML :
     *   options="{'color_map': [{'value':'OK','color':'GreenYellow'}, {'value':'nOK','color':'red'}]}"
     * 
     * Les sous-classes peuvent surcharger cette méthode pour fournir un mapping par défaut.
     */
    get colorMap() {
        return this.props.color_map || [];
    }

    /**
     * Retourne la couleur de fond correspondant à la valeur courante.
     */
    get backgroundColor() {
        const value = this.props.value;
        if (value === false || value === undefined || value === null) {
            return "transparent";
        }
        const map = this.colorMap;
        if (map && Array.isArray(map) && map.length > 0) {
            for (const entry of map) {
                if (entry.value !== undefined && entry.color) {
                    if (String(entry.value) === String(value)) {
                        return entry.color;
                    }
                }
            }
        }
        return "transparent";
    }

    get options() {
        switch (this.props.record.fields[this.props.name].type) {
            case "many2one":
                return [...this.props.record.preloadedData[this.props.name]];
            case "selection":
                return this.props.record.fields[this.props.name].selection.filter(
                    (option) => option[0] !== false && option[1] !== ""
                );
            default:
                return [];
        }
    }

    get string() {
        switch (this.props.type) {
            case "many2one":
                return this.props.value ? this.props.value[1] : "";
            case "selection":
                if (this.props.value === false) return "";
                const found = this.options.find((o) => o[0] === this.props.value);
                return found ? found[1] : "";
            default:
                return "";
        }
    }

    get value() {
        const rawValue = this.props.value;
        return this.props.type === "many2one" && rawValue ? rawValue[0] : rawValue;
    }

    get isRequired() {
        return this.props.record.isRequired(this.props.name);
    }

    stringify(value) {
        return JSON.stringify(value);
    }

    /**
     * Applique la couleur de fond sur l'élément parent (la cellule <td> du formulaire).
     */
    _applyColor() {
        const el = this.rootRef.el;
        const bgColor = this.backgroundColor;
        if (el) {
            el.style.setProperty('background-color', bgColor, 'important');
            let parent = el.parentElement;
            let applied = false;
            while (parent) {
                const tag = parent.tagName;
                if (parent.classList.contains('o_field_widget') || parent.classList.contains('o_cell')) {
                    parent.style.setProperty('background-color', bgColor, 'important');
                }
                if (tag === 'TD') {
                    parent.style.setProperty('background-color', bgColor, 'important');
                    applied = true;
                    const prevTd = parent.previousElementSibling;
                    if (prevTd && prevTd.tagName === 'TD' && prevTd.classList.contains('o_td_label')) {
                        prevTd.style.setProperty('background-color', bgColor, 'important');
                    }
                    break;
                }
                if (tag === 'TR' || tag === 'TABLE' || tag === 'FORM') {
                    break;
                }
                parent = parent.parentElement;
            }
            if (!applied && el.parentElement) {
                el.parentElement.style.setProperty('background-color', bgColor, 'important');
            }
        }
    }

    /**
     * @param {Event} ev
     */
    onChange(ev) {
        const value = JSON.parse(ev.target.value);
        switch (this.props.type) {
            case "many2one":
                if (value === false) {
                    this.props.update(false);
                } else {
                    this.props.update(this.options.find((option) => option[0] === value));
                }
                break;
            case "selection":
                this.props.update(value);
                break;
        }
    }
}

IsBackgroundColorField.template = "is_background_color_widget.IsBackgroundColorField";
IsBackgroundColorField.props = {
    ...standardFieldProps,
    placeholder: { type: String, optional: true },
    color_map: { type: Array, optional: true },
};

IsBackgroundColorField.displayName = _lt("Background Color");
IsBackgroundColorField.supportedTypes = ["many2one", "selection"];

IsBackgroundColorField.isEmpty = (record, fieldName) => record.data[fieldName] === false;
IsBackgroundColorField.extractProps = ({ field, attrs }) => {
    const options = attrs.options || {};
    return {
        placeholder: attrs.placeholder,
        color_map: options.color_map || [],
    };
};

registry.category("fields").add("is_background_color", IsBackgroundColorField);
