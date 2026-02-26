/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _lt } from "@web/core/l10n/translation";
import { IsBackgroundColorField } from "./is_background_color_field";


/**
 * Widget spécialisé pour les revues de risque.
 * Hérite de IsBackgroundColorField avec un mapping couleur pré-rempli :
 *   0  => GreenYellow  (Absence de risque)
 *   1  => orange        (Risque faible)
 *   2  => red           (Risque fort)
 *   NA => Gainsboro     (Non applicable)
 *
 * Utilisation dans le XML :
 *   <field name="mon_champ" widget="is_revue_risque"/>
 *   (pas besoin de spécifier d'options)
 */
export class IsRevueRisqueField extends IsBackgroundColorField {

    /**
     * Mapping couleur pré-rempli pour les revues de risque.
     * Surcharge le getter de la classe parente.
     */
    get colorMap() {
        if (this.props.color_map && this.props.color_map.length > 0) {
            return this.props.color_map;
        }
        return [
            { value: "0",  color: "GreenYellow" },
            { value: "1",  color: "orange" },
            { value: "2",  color: "red" },
            { value: "NA", color: "Gainsboro" },
        ];
    }
}

IsRevueRisqueField.template = "is_background_color_widget.IsRevueRisqueField";
IsRevueRisqueField.displayName = _lt("Revue Risque");

registry.category("fields").add("is_revue_risque", IsRevueRisqueField);
