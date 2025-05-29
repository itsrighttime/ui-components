import React, { useRef } from "react";
import { useSmartPosition } from "your-library-name";

// Example CSS 
/**

 .dropdown.top { bottom: 100%; }
 .dropdown.bottom { top: 100%; }
 .dropdown.left { right: 0; }
 .dropdown.right { left: 0; }
 
 */

export const MyDropdown = () => {
  const ref = useRef();
  const position = useSmartPosition(ref);

  return (
    <div
      ref={ref}
      className={`dropdown ${position.vertical} ${position.horizontal}`}
    >
      Your dropdown content here
    </div>
  );
};
