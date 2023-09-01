import { PropType } from 'vue';
import { TSerie, TOption } from './types';
declare const _default: import("vue").DefineComponent<{
    series: {
        type: PropType<TSerie[]>;
        default(): never[];
    };
    baseValue: {
        type: NumberConstructor;
        default: number;
    };
    options: {
        type: PropType<TOption>;
        default(): {
            upColor: string;
            downColor: string;
            lineWidth: number;
        };
    };
    interactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    gridLines: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    series: {
        type: PropType<TSerie[]>;
        default(): never[];
    };
    baseValue: {
        type: NumberConstructor;
        default: number;
    };
    options: {
        type: PropType<TOption>;
        default(): {
            upColor: string;
            downColor: string;
            lineWidth: number;
        };
    };
    interactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    gridLines: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    series: TSerie[];
    baseValue: number;
    options: TOption;
    interactive: boolean;
    gridLines: boolean;
}, {}>;
export default _default;
