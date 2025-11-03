Front end is running using ReactRouter.

Router always displays the Navbar at the top, and then shows one of three subordinate pages: splash, inventory, and employees.

Splash just shows the background, one of the widges and a button to explore (takes to inventory).

Inventory shows all of the available variants (pulls using getAll on load, then combines them by product to avoid duplicates). Inventory also allows to sort by color (another front end filter call).

Employee page lets you CRUD colors, products and variants. Note: in order to create a variant - there must be at least one color and at least one prodcut. To delete a color or product, you must make sure that there are no variants that use them.
