"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TssCacheProvider = exports.useTssEmotionCache = exports.getDoExistsTssDefaultEmotionCacheMemoizedValue = exports.getTssDefaultEmotionCache = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const cache_1 = __importDefault(require("@emotion/cache"));
_a = (() => {
    let cache = undefined;
    /**
     * Lazily initialized singleton
     * If doReset is set to true the memoized instance will be
     * discarded and a new one created.
     * */
    function getTssDefaultEmotionCache(params) {
        const { doReset = false } = params !== null && params !== void 0 ? params : {};
        if (doReset) {
            cache = undefined;
        }
        if (cache === undefined) {
            cache = (0, cache_1.default)({ "key": "tss" });
        }
        return cache;
    }
    return {
        getTssDefaultEmotionCache,
        "getDoExistsTssDefaultEmotionCacheMemoizedValue": () => cache !== undefined,
    };
})(), exports.getTssDefaultEmotionCache = _a.getTssDefaultEmotionCache, exports.getDoExistsTssDefaultEmotionCacheMemoizedValue = _a.getDoExistsTssDefaultEmotionCacheMemoizedValue;
const context = (0, react_1.createContext)(undefined);
function useTssEmotionCache() {
    const cacheExplicitlyProvidedForTss = (0, react_1.useContext)(context);
    return cacheExplicitlyProvidedForTss !== null && cacheExplicitlyProvidedForTss !== void 0 ? cacheExplicitlyProvidedForTss : (0, exports.getTssDefaultEmotionCache)();
}
exports.useTssEmotionCache = useTssEmotionCache;
function TssCacheProvider(props) {
    const { children, value } = props;
    return (0, jsx_runtime_1.jsx)(context.Provider, Object.assign({ value: value }, { children: children }), void 0);
}
exports.TssCacheProvider = TssCacheProvider;
