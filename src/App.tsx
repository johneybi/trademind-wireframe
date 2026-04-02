import { screenRegistry } from "@/pages/screen-registry";
import { HomePage } from "@/pages/home-page";

function App() {
  const params = new URLSearchParams(window.location.search);
  const screenId = params.get("screen");
  const stateId = params.get("state");

  if (screenId) {
    const screen = screenRegistry.find((s) => s.id === screenId);
    if (screen) {
      const ScreenComponent = screen.component;
      const props = screen.getComponentProps?.(stateId ?? undefined) ?? {};
      return (
        <div style={{ width: 390, height: 844 }} className="overflow-hidden">
          <ScreenComponent {...props} />
        </div>
      );
    }
  }

  return <HomePage />;
}

export default App;
