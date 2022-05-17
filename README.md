# DynamicHierarchicalFacetBreadcrumbs

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/dynamic-hierarchical-facet-breadcrumbs
```

2. Use the Component or extend it

Typescript:

```javascript
import { DynamicHierarchicalFacetBreadcrumbs, IDynamicHierarchicalFacetBreadcrumbsOptions } from '@coveops/dynamic-hierarchical-facet-breadcrumbs';
```

Javascript

```javascript
const DynamicHierarchicalFacetBreadcrumbs = require('@coveops/dynamic-hierarchical-facet-breadcrumbs').DynamicHierarchicalFacetBreadcrumbs;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/dynamic-hierarchical-facet-breadcrumbs'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/dynamic-hierarchical-facet-breadcrumbs@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup:

```html
<div class="CoveoDynamicHierarchicalFacetBreadcrumbs" data-field="@atlgeographicalhierarchy"></div>
```

where `@atlgeographicalhierarchy` is the name of the field you want to display as breadcrumbs. See more information in the `Options` section of the documentation.

## Extending

Extending the component can be done as follows:

```javascript
import { DynamicHierarchicalFacetBreadcrumbs, IDynamicHierarchicalFacetBreadcrumbsOptions } from "@coveops/dynamic-hierarchical-facet-breadcrumbs";

export interface IExtendedDynamicHierarchicalFacetBreadcrumbsOptions extends IDynamicHierarchicalFacetBreadcrumbsOptions {}

export class ExtendedDynamicHierarchicalFacetBreadcrumbs extends DynamicHierarchicalFacetBreadcrumbs {}
```

## Options

The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `breadcrumbParentName` | No | string | `All Categories` | Name of the parent category. |
| `field` | Yes | string |  | Specifies the multi-value field whose values will be displayed as separate levels in the resulting breadcrumb. This must match the field used in your interface's `CoveoDynamicHierarchicalFacet`. It is important to note that this can only work with **one** instance of `CoveoDynamicHierarchicalFacet`. The `field` attribute **must match** the value of the one used in `CoveoDynamicHierarchicalFacet`. |


## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`