import.meta.env = {"BASE_URL": "/", "DEV": true, "LEGACY": false, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_URL": "", "VITE_APP_TITLE": "h5 app dev", "VITE_BASE_URL": "", "VITE_DROP_CONSOLE": "true"};import { createApp } from "/node_modules/.vite/deps/vue.js?v=34817e47";
import "/src/styles/main.scss";
import { getNativeAppInfo, ipadAddClass } from "/@fs/Users/xunliangjiang/Documents/WebProject/pnpm-vite6-tpl/packages/utils/src/index.ts";
import "/node_modules/.vite/deps/@vant_touch-emulator.js?v=34817e47";
import App from "/src/App.vue";
import { setupAllPlugins } from "/src/plugins/index.ts";
import MobileRouter from "/src/router/index.ts";
import { setupStore } from "/src/stores/index.ts";
import { useAppStore } from "/src/stores/appStore.ts";
const envMode = import.meta.env.MODE;
console.error("vite import meta:", envMode);
const app = createApp(App);
setupAllPlugins(app);
setupStore(app);
ipadAddClass();
const initAppStoreInfo = () => {
  const appStore = useAppStore();
  const { setAppInfo } = appStore;
  getNativeAppInfo().then((data) => {
    console.log("app data:", data);
    setAppInfo(data);
  }).catch((e) => {
    console.error("get app info error:", e);
  });
};
if (["development"].includes(envMode)) {
  app.use(MobileRouter).mount("#app");
} else {
  document.addEventListener(
    "deviceready",
    () => {
      app.use(MobileRouter).mount("#app");
      initAppStoreInfo();
    },
    false
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuaW1wb3J0ICdAL3N0eWxlcy9tYWluLnNjc3MnXG5pbXBvcnQgeyBnZXROYXRpdmVBcHBJbmZvLCBpcGFkQWRkQ2xhc3MgfSBmcm9tICdAanhsdXN0L3V0aWxzJ1xuaW1wb3J0ICdAdmFudC90b3VjaC1lbXVsYXRvcidcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAudnVlJ1xuaW1wb3J0IHsgc2V0dXBBbGxQbHVnaW5zIH0gZnJvbSAnLi9wbHVnaW5zL2luZGV4J1xuaW1wb3J0IE1vYmlsZVJvdXRlciBmcm9tICcuL3JvdXRlcidcbmltcG9ydCB7IHNldHVwU3RvcmUgfSBmcm9tICcuL3N0b3JlcydcbmltcG9ydCB7IHVzZUFwcFN0b3JlIH0gZnJvbSAnLi9zdG9yZXMvYXBwU3RvcmUnXG5cbmNvbnN0IGVudk1vZGUgPSBpbXBvcnQubWV0YS5lbnYuTU9ERVxuY29uc29sZS5lcnJvcigndml0ZSBpbXBvcnQgbWV0YTonLCBlbnZNb2RlKVxuY29uc3QgYXBwID0gY3JlYXRlQXBwKEFwcClcbnNldHVwQWxsUGx1Z2lucyhhcHApXG5zZXR1cFN0b3JlKGFwcClcblxuLy8gaWYgKHRydWUpIHtcbi8vIOS4sOWjsOW+ruW6lOeUqOeOr+Wig1xuLy9pcGFkIGZpeGVkXG5pcGFkQWRkQ2xhc3MoKVxuXG4vKipcbiAqIOWIneWni+WMluWOn+eUn+iOt+WPlueahOS4gOS6m+S/oeaBr1xuICovXG5jb25zdCBpbml0QXBwU3RvcmVJbmZvID0gKCkgPT4ge1xuICBjb25zdCBhcHBTdG9yZSA9IHVzZUFwcFN0b3JlKClcbiAgY29uc3QgeyBzZXRBcHBJbmZvIH0gPSBhcHBTdG9yZVxuICBnZXROYXRpdmVBcHBJbmZvKClcbiAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwIGRhdGE6JywgZGF0YSlcbiAgICAgIHNldEFwcEluZm8oZGF0YSlcbiAgICB9KVxuICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0IGFwcCBpbmZvIGVycm9yOicsIGUpXG4gICAgfSlcbn1cbmlmIChbJ2RldmVsb3BtZW50J10uaW5jbHVkZXMoZW52TW9kZSkpIHtcbiAgYXBwLnVzZShNb2JpbGVSb3V0ZXIpLm1vdW50KCcjYXBwJylcbn0gZWxzZSB7XG4gIC8vIOeUn+S6p+eOr+Wig+mcgOimgeehruS/nWNvcmRvdmHliqDovb3lrozmiJBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnZGV2aWNlcmVhZHknLFxuICAgICgpID0+IHtcbiAgICAgIGFwcC51c2UoTW9iaWxlUm91dGVyKS5tb3VudCgnI2FwcCcpXG4gICAgICBpbml0QXBwU3RvcmVJbmZvKClcbiAgICB9LFxuICAgIGZhbHNlLFxuICApXG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsaUJBQWlCO0FBQzFCLE9BQU87QUFDUCxTQUFTLGtCQUFrQixvQkFBb0I7QUFDL0MsT0FBTztBQUNQLE9BQU8sU0FBUztBQUNoQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLGtCQUFrQjtBQUN6QixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG1CQUFtQjtBQUU1QixNQUFNLFVBQVUsWUFBWSxJQUFJO0FBQ2hDLFFBQVEsTUFBTSxxQkFBcUIsT0FBTztBQUMxQyxNQUFNLE1BQU0sVUFBVSxHQUFHO0FBQ3pCLGdCQUFnQixHQUFHO0FBQ25CLFdBQVcsR0FBRztBQUtkLGFBQWE7QUFLYixNQUFNLG1CQUFtQixNQUFNO0FBQzdCLFFBQU0sV0FBVyxZQUFZO0FBQzdCLFFBQU0sRUFBRSxXQUFXLElBQUk7QUFDdkIsbUJBQWlCLEVBQ2QsS0FBSyxDQUFDLFNBQWM7QUFDbkIsWUFBUSxJQUFJLGFBQWEsSUFBSTtBQUM3QixlQUFXLElBQUk7QUFBQSxFQUNqQixDQUFDLEVBQ0EsTUFBTSxDQUFDLE1BQU07QUFDWixZQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFBQSxFQUN4QyxDQUFDO0FBQ0w7QUFDQSxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsT0FBTyxHQUFHO0FBQ3JDLE1BQUksSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNO0FBQ3BDLE9BQU87QUFFTCxXQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0EsTUFBTTtBQUNKLFVBQUksSUFBSSxZQUFZLEVBQUUsTUFBTSxNQUFNO0FBQ2xDLHVCQUFpQjtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjsiLCJuYW1lcyI6W119