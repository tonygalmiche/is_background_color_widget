# -*- coding: utf-8 -*-
{
    "name": "InfoSaône - Widget Background Color",
    "version": "16.0.1.0.0",
    "author": "InfoSaône",
    "category": "InfoSaône",
    "description": """
Widget Background Color pour Odoo 16
=====================================

Ce module fournit deux vrais widgets pour les champs Selection :

- **is_background_color** : widget générique qui colorie le fond de la cellule
  selon la valeur du champ. Les couleurs sont configurables via l'attribut options.
  Exemple : widget="is_background_color" options="{'color_map': [{'value':'OK','color':'GreenYellow'},{'value':'nOK','color':'red'}]}"

- **is_revue_risque** : widget spécialisé qui hérite de is_background_color avec
  les couleurs pré-remplies pour les revues de risque :
  0 = GreenYellow, 1 = orange, 2 = red, NA = Gainsboro
  Exemple : widget="is_revue_risque"
""",
    "maintainer": "InfoSaône",
    "website": "http://www.infosaone.com",
    "depends": [
        "web",
    ],
    "data": [],
    "assets": {
        "web.assets_backend": [
            "is_background_color_widget/static/src/js/is_background_color_field.js",
            "is_background_color_widget/static/src/js/is_background_color_field.xml",
            "is_background_color_widget/static/src/js/is_revue_risque_field.js",
            "is_background_color_widget/static/src/js/is_revue_risque_field.xml",
            "is_background_color_widget/static/src/css/is_background_color.css",
        ],
    },
    "license": "LGPL-3",
    "installable": True,
    "auto_install": False,
    "application": False,
}
