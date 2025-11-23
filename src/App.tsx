import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { PropertyForm } from "./components/PropertyForm";

const system = createSystem(defaultConfig);

function App() {
  return (
    <ChakraProvider value={system}>
      <PropertyForm />
    </ChakraProvider>
  );
}

export default App;
