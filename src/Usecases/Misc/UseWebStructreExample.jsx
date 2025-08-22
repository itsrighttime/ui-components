import { WebStructure } from "./components/WebStructure/WebStructure";

const headerTabs = [
  { name: "Home", goTo: "/" },
  { name: "About", goTo: "/about" },
  { name: "Contact", goTo: "/contact" },
];

const brandFooter = {
  name: "MyBrand",
  tagLine: "Innovating Your Business",
  tabs: [
    { name: "Privacy Policy", goTo: "/privacy-policy" },
    { name: "Terms of Service", goTo: "/terms" },
  ],
  contactus: {
    address: "New York, USA",
    mobile: "+1 234 567 890",
    email: "contact@mybrand.com",
  },
  socialMedia: [
    { name: "facebook", goTo: "/facebook" },
    { name: "instagram", goTo: "/instagram" },
  ],
  getInTouch: { name: "Get in Touch", goTo: "/contact" },
};

const App = () => {
  return (
    <WebStructure brandFooter={brandFooter} headerTabs={headerTabs}>
      <h1>Welcome to MyBrand</h1>
      <p>Your one-stop solution for business innovation.</p>
    </WebStructure>
  );
};

export default App;
