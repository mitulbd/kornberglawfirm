"use client";
import { useEffect } from 'react';

const useReplaceSvgImages = () => {
  useEffect(() => {
    document.querySelectorAll("img.svg").forEach((img) => {
      const imgID = img.getAttribute("id");
      const imgClass = img.getAttribute("class");
      const imgURL = img.getAttribute("src");

      fetch(imgURL)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(data, "image/svg+xml");
          const svg = svgDoc.querySelector("svg");
          if (svg) {
            if (imgID) svg.setAttribute("id", imgID);
            if (imgClass) svg.setAttribute("class", `${imgClass} replaced-svg`);
            svg.removeAttribute("xmlns:a");
            if (!svg.getAttribute("viewBox") && svg.getAttribute("height") && svg.getAttribute("width")) {
              svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`);
            }
            if (img.parentNode) {
              img.parentNode.replaceChild(svg, img);
            } else {
              console.warn("Image parent node is not found.");
            }
          } else {
            console.warn("No SVG element found in the fetched data.");
          }
        })
        .catch(error => {
          console.error("Error fetching SVG:", error);
        });
    });
  }, []);
};

export default useReplaceSvgImages;
