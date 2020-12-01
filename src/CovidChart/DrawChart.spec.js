import * as d3 from "d3";
const { default: CovidChart } = require("./covidChart");
const { default: drawChart } = require("./DrawChart");
import { render } from "@testing-library/react";

const getSvg = () => {
  return d3.select("svg");
};

describe("drawChart test", () => {
  let testData = [
    { key: "active", value: 2000 },
    { key: "confirmed", value: 3000 },
    { key: "recovered", value: 4000 },
  ];
  let testColor = {
    active: "blue",
    confirmed: "red",
    recovered: "green",
    deceased: "orange",
  };
  let testDimensions = {
    height: 500,
    width: 400,
  };
  beforeEach(function () {
    render(<div id="chart"></div>);
    drawChart("#chart", testData, testColor, testDimensions);
  });

  it("renders svg with correct dimensions", () => {
    expect(getSvg()).not.toBeNull();
    expect(getSvg().attr("width")).toBe(testDimensions.width.toString());
    expect(getSvg().attr("height")).toBe(testDimensions.height.toString());
  });

  it("renders g elements inside svg", () => {
    expect(getSvg().select("g#bars")._groups[0].length).toBe(1);
  });

  it("render correct data with bars", () => {
    expect(getSvg().select("g#bars").selectAll("rect")._groups[0].length).toBe( 3);
    expect(getSvg().select("g#bars").selectAll("rect").attr("height")).toBe("215");
  });

  it("renders the axis", () => {
    expect(getSvg().selectAll("g#x-axis")._groups[0].length).toBe(1);
    expect(getSvg().selectAll("g#y-axis")._groups[0].length).toBe(1);
  });
});
