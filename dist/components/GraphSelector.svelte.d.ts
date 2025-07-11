import type { GraphSelectorQuestion } from '../types';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const GraphSelector: $$__sveltets_2_IsomorphicComponent<{
    /**
       * GraphSelector component
       * Props:
       * - question: GraphSelectorQuestion (required)
       * - onAnswerChange: (answer: Record<string, string>) => void (required)
       * - showAnswer: boolean (optional, default false)
       * - disabled: boolean (optional, default false)
       * - width: number (optional, px, default 400)
       * - height: number (optional, px, default 400)
       */ question: GraphSelectorQuestion;
    onAnswerChange: (answer: Record<string, string>) => void;
    showAnswer?: boolean;
    disabled?: boolean;
    width?: number;
    height?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type GraphSelector = InstanceType<typeof GraphSelector>;
export default GraphSelector;
