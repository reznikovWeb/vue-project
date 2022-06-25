import am5locales_ru from "@amcharts/amcharts5/locales/ru_RU";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { dataVisits } from "@/constants/data";
import * as am5 from "@amcharts/amcharts5";

export const graph = (root) => {
  class MyTheme extends am5.Theme {
    setupDefaultRules() {
      this.rule("Label").setAll({
        fontSize: 16,
        fill: am5.color("#ffffff"),
      });
      this.rule("Container", ["axis"]).setAll({
        fill: am5.color("#ffffff"),
      });
    }
  }

  root.locale = am5locales_ru;
  root.setThemes([am5themes_Animated.new(root), MyTheme.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    })
  );

  // Define data
  let data = dataVisits;

  // Create X-axis
  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0.1,
      groupData: false,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );
  // Create Y-axis
  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.2,
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Create series
  const series = chart.series.push(
    am5xy.LineSeries.new(root, {
      minBulletDistance: 10,
      connect: false,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "visits",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}",
      }),
    })
  );

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true,
  });

  series.strokes.template.setAll({
    strokeWidth: 2,
  });

  // Set up data processor to parse string dates
  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"],
  });

  series.data.setAll(data);

  series.bullets.push(function () {
    const circle = am5.Circle.new(root, {
      radius: 4,
      fill: root.interfaceColors.get("background"),
      stroke: series.get("fill"),
      strokeWidth: 2,
    });

    return am5.Bullet.new(root, {
      sprite: circle,
    });
  });

  // Add cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {}));
};
