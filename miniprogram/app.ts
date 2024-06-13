// app.ts
import { initEid } from './mp_ecard_sdk/main';
// import { onGetAddressInfo } from "./utils/authAddress";

App<IAppOption>({
    globalData: {
        applyAssure: null
    },
    onLaunch(options) {
        initEid();
    }
})