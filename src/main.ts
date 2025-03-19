// 合并后的单文件实现
class Point {
  constructor(
    public x: number,
    public y: number
  ) {}

  distanceTo(other: Point): number {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

class TheoremChecker {
  static isRightAngleTriangle(sides: [number, number, number]): boolean {
    const [a, b, c] = [...sides].sort((x, y) => x - y);
    return Math.abs(a ** 2 + b ** 2 - c ** 2) < 1e-6;
  }

  // 新增角度计算方法
  static calculateAngle(a: number, b: number, c: number): number {
    return Math.acos((a**2 + b**2 - c**2) / (2 * a * b)) * (180 / Math.PI);
  }

  // 新增相似性验证
  static isSimilarTriangle(sides1: [number, number, number], sides2: [number, number, number]): boolean {
    const ratios = sides1.map((v, i) => v / sides2[i]);
    return Math.max(...ratios) - Math.min(...ratios) < 1e-6;
  }
}

interface Shape {
  getPoints(): Point[];
}

class Triangle implements Shape {
  private a: Point;
  private b: Point;
  private c: Point;

  constructor(a: Point, b: Point, c: Point) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getPoints(): Point[] {
    return [this.a, this.b, this.c];
  }

  private get sides(): [number, number, number] {
    return [
      this.a.distanceTo(this.b),
      this.b.distanceTo(this.c),
      this.c.distanceTo(this.a),
    ];
  }

  // 新增角度获取方法
  get angles(): [number, number, number] {
    const [a, b, c] = this.sides;
    return [
      TheoremChecker.calculateAngle(b, c, a),
      TheoremChecker.calculateAngle(a, c, b),
      TheoremChecker.calculateAngle(a, b, c)
    ];
  }

  verifyPythagoras(): boolean {
    return TheoremChecker.isRightAngleTriangle(this.sides);
  }

  // 新增相似性验证
  verifySimilarity(other: Triangle): boolean {
    return TheoremChecker.isSimilarTriangle(this.sides, other.sides);
  }
}

// 主程序入口
const rightTriangle = new Triangle(
  new Point(0, 0),
  new Point(3, 0),
  new Point(0, 4)
);

console.log(`三角形顶点：${rightTriangle.getPoints().join(', ')}`);
console.log(`是否符合勾股定理：${rightTriangle.verifyPythagoras()}`);

// 新增HTML交互逻辑
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('triangleForm') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const a = new Point(
        +(document.getElementById('aX') as HTMLInputElement).value,
        +(document.getElementById('aY') as HTMLInputElement).value
      );
      const b = new Point(
        +(document.getElementById('bX') as HTMLInputElement).value,
        +(document.getElementById('bY') as HTMLInputElement).value
      );
      const c = new Point(
        +(document.getElementById('cX') as HTMLInputElement).value,
        +(document.getElementById('cY') as HTMLInputElement).value
      );
      const triangle = new Triangle(a, b, c);
      // 显示结果...
    });
  });
}
