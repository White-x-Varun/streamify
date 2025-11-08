import { Loader2Icon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
const PageLoader = () => {
  const { theme } = useThemeStore();
  <div
    className="min-h-screen flex items-center justify-center"
    data-theme={theme}
  >
    <Loader2Icon className="animate-spin sie-10 text-primary" />
  </div>;
};
export default PageLoader;
