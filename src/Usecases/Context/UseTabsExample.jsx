import React, { useEffect } from "react";
import { useTab } from "../../Context/jsx/TabContext";

const TabViewer = () => {
  const { content, tabsLevel1, loadTabs, loading } = useTab();

  useEffect(() => {
    loadTabs("Dashboard");
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{content?.workspaceName}</h2>
      <p>{content?.data}</p>

      <h3>Top Tabs (Level1):</h3>
      {tabsLevel1.top?.mid?.map((tab) => (
        <div key={tab.key}>{tab.value}</div>
      ))}
    </div>
  );
};

export default TabViewer;
