import { DynamicHierarchicalFacetBreadcrumb, Component, IComponentBindings, ComponentOptions, IDynamicHierarchicalFacet, IBuildingQueryEventArgs, QueryEvents, FacetType } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IHfcHierarchicalBreadcrumbsOptions {
    breadcrumbParentName: string;
    field: string;
}

@lazyComponent
export class DynamicHierarchicalFacetBreadcrumbs extends Component {
    static ID = 'DynamicHierarchicalFacetBreadcrumbs';
    static options: IHfcHierarchicalBreadcrumbsOptions = {
        breadcrumbParentName: ComponentOptions.buildStringOption({ defaultValue: 'All Categories' }),
        field: ComponentOptions.buildStringOption(),
    };

    constructor(public element: HTMLElement, public options: IHfcHierarchicalBreadcrumbsOptions, public bindings: IComponentBindings) {
        super(element, DynamicHierarchicalFacetBreadcrumbs.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, DynamicHierarchicalFacetBreadcrumbs, options);
        this.bind.onRootElement(QueryEvents.buildingQuery, (args: IBuildingQueryEventArgs) => this.generateBreadcrumbs(args));
    }

    generateBreadcrumbs(args: IBuildingQueryEventArgs) {
        Coveo.$$(this.element).empty();
        if (!this.options.field) return;
        const field = this.options.field.substring(1);
        const stateFaceetRequest = Coveo.state(this.element);

        const newLocal = stateFaceetRequest['attributes'];
        let str = null;
        if (newLocal[`f:@${field}`].length > 0) {
            str = '';
            for (let x = 0; x < newLocal[`f:@${field}`].length; x++) {
                for (let y = 0; y <= x; y++) {
                    str += (newLocal[`f:@${field}`][y]) + ', ';
                }
                str = str.slice(0, -2);
                str += ' / ';
            }
        }
        str = str.slice(0, -2);
        let splitValues = str.trim().split('/');
        if (splitValues.length > 0) {
            splitValues.unshift(this.options.breadcrumbParentName)
            splitValues.forEach((value, index) => {
                let splitStr = value.trim().split(',').at(-1);
                if (index === splitValues.length - 1) {
                    Coveo.$$(this.element).append(Coveo.$$('span', {}, splitStr).el)
                } else {
                    Coveo.$$(this.element).append(Coveo.$$('a', { href: `${this.getUri(args, field, index === 0)}${index > 0 && `[${splitStr}]`}` }, splitStr).el)
                    Coveo.$$(this.element).append(Coveo.$$('span', {}, ' / ').el)
                }
            });
        }
    }

    private getUri(args: IBuildingQueryEventArgs, field: string, first: boolean = false) {
        const tab = Coveo.state(this.element, "t");
        const query = Coveo.state(this.element, "q");
        if (first) return `#q=${query}&t=${tab}&sort=relevancy`;
        return `#q=${query}&t=${tab}&sort=relevancy&f:@${field}=`;
    }
}