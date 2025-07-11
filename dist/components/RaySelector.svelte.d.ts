import type { RaySelectorQuestion } from '../types/index';
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
declare const RaySelector: $$__sveltets_2_IsomorphicComponent<{
    /**
       * RaySelector component
       * Props:
       * - question: RaySelectorQuestion (required)
       * - onAnswerChange: (answer: Record<string, string>) => void (required)
       * - showAnswer: boolean (optional, default false)
       * - disabled: boolean (optional, default false)
       * - width: number (optional, px, default 400)
       */ question: RaySelectorQuestion;
    onAnswerChange: (answer: Record<string, string>) => void;
    showAnswer?: boolean;
    disabled?: boolean;
    width?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type RaySelector = InstanceType<typeof RaySelector>;
export default RaySelector;
