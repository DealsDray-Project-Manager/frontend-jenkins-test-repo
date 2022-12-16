import type { ReactNode } from "react";
import type { EmotionCache } from "@emotion/cache";
export declare const getTssDefaultEmotionCache: (params?: {
    doReset: boolean;
} | undefined) => EmotionCache, getDoExistsTssDefaultEmotionCacheMemoizedValue: () => boolean;
export declare function useTssEmotionCache(): EmotionCache;
export declare function TssCacheProvider(props: {
    value: EmotionCache;
    children: ReactNode;
}): JSX.Element;
