#  [WIP] Mirador-Mezanno

Mirador-Mezanno is a Mirador 4 plugin that adds collection and annotation tools to the user interface.

## Demo

A demo is available at https://jonathan-epita.github.io/mirador-mezanno/

## Installation

To install Mirador-Mezanno, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/mirador-mezanno.git
    ```
2. Navigate to the project directory:
    ```sh
    cd mirador-mezanno
    ```
3. Install the dependencies:
    ```sh
    pnpm install
    ```
4. Build mirador dependency:
    ```sh
    turbo build --filter=mirador
    ```
5. Test the project:
    ```sh
    turbo dev
    ```
## Use

### Opening/Adding manifests
For now, you can open manifests and add them to your collection by accessing the application directly from its URL.

http://localhost:[port]/manifestId=[your][url]/manifest.json

Example:

http://localhost:5174/?manifestId=https://gallica.bnf.fr/iiif/ark:/12148/bpt6k2093046s/manifest.json

You can also use this extension (Firefox|Chrome) :
https://github.com/2SC1815J/open-in-iiif-viewer/tree/master

On the options page, you may set the url of the mirador application (ex: http://localhost:5174/?manifestId=)

### Bookmarks