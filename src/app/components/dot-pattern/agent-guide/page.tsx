export default function DotPatternAgentGuide() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-12 prose prose-sm">
      <h1>Dot Pattern Background - Design Principles Guide for AI Agents</h1>
      
      <p className="lead">
        This guide provides structured design principles for dot pattern backgrounds in UI design. 
        Optimized for AI agent consumption.
      </p>

      <h2>1. Core Problem & Solution</h2>
      
      <h3>Problem</h3>
      <p>
        In white-dominant UI interfaces, distinguishing module areas requires visual differentiation. 
        Traditional solution: light gray fill (#F5F5F5) creates a "heavy" settling effect, making interfaces dull.
      </p>
      
      <h3>Solution</h3>
      <p>
        Dot patterns use <strong>frequency instead of depth</strong> to create hierarchy. 
        Better aligned with modern "digital native" UI aesthetics.
      </p>

      <h2>2. Visual Principles</h2>
      
      <h3>2.1 Negative Space (透气感)</h3>
      <ul>
        <li>Dot patterns preserve large amounts of white background</li>
        <li>Human eye groups scattered dots into unified area (Gestalt)</li>
        <li>Brain perceives background as "breathing" through gaps</li>
        <li>Gray fill changes all pixels → opaque visual mass</li>
      </ul>

      <h3>2.2 Spatial Mixing (空间混色)</h3>
      <ul>
        <li>Micro: dark dots + white background = high contrast</li>
        <li>Macro: brain smooths perception into "textured gray"</li>
        <li>High-frequency texture defines module boundaries better than low-frequency flat gray</li>
        <li>Achieves clarity without adding visual weight</li>
      </ul>

      <h3>2.3 Color Purity (避免脏感)</h3>
      <ul>
        <li>Light gray (#F5F5F5) appears muddy on low-quality/OLED screens</li>
        <li>Dot pattern uses pure black (#000) + low opacity (3-8%)</li>
        <li>White backlight penetrates through dots</li>
        <li>Maintains brightness and color purity</li>
      </ul>

      <h3>2.4 Coverage Formula</h3>
      <p>
        Dots occupy only 1-3% of retinal energy → "high frequency signal" → 
        far less attention-grabbing than solid gray blocks.
      </p>

      <h2>3. Quantitative Control</h2>
      
      <h3>3.1 Coverage Rate Model</h3>
      <pre>Coverage = π × r² / g²</pre>
      <ul>
        <li>r = dot radius</li>
        <li>g = center-to-center spacing</li>
      </ul>

      <h3>3.2 Recommended Coverage: 1-3%</h3>
      <ul>
        <li>&lt; 1%: nearly invisible</li>
        <li>1-3%: texture present but not dominant (sweet spot)</li>
        <li>&gt; 3%: starts competing with foreground for attention</li>
      </ul>

      <h3>3.3 Parameter Guidelines</h3>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Recommended</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Size</td>
            <td>1px</td>
            <td>Physical pixel alignment, sharpest rendering</td>
          </tr>
          <tr>
            <td>Gap</td>
            <td>16/24px</td>
            <td>Matches 8pt grid system</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>#000</td>
            <td>Pure black + opacity, not gray value</td>
          </tr>
          <tr>
            <td>Opacity</td>
            <td>3-8%</td>
            <td>5% is golden balance point</td>
          </tr>
        </tbody>
      </table>

      <h3>3.4 Example Configurations</h3>
      <ul>
        <li><strong>A: Delicate Breathing</strong> - r=0.5px, g=24px → Coverage ≈ 0.14% (large backgrounds)</li>
        <li><strong>B: Standard Texture</strong> - r=0.5px, g=16px → Coverage ≈ 0.31% (most versatile)</li>
        <li><strong>C: Visible Texture</strong> - r=1px, g=12px → Coverage ≈ 2.18% (emphasized areas)</li>
      </ul>

      <h2>4. Shape Language</h2>
      
      <p>Shape choice fundamentally changes interface mood and guidance. Each shape has distinct "visual personality".</p>

      <h3>4.1 Circle (圆形)</h3>
      <ul>
        <li><strong>Personality:</strong> Soft, light, free</li>
        <li><strong>Properties:</strong> No directionality, strongest isotropy</li>
        <li><strong>Use cases:</strong> Creative canvas, content display, brand websites</li>
        <li><strong>Why:</strong> Eye doesn't read "alignment lines" from circles → minimal interference with foreground</li>
      </ul>

      <h3>4.2 Cross (十字)</h3>
      <ul>
        <li><strong>Personality:</strong> Industrial, precise, positioning</li>
        <li><strong>Properties:</strong> Strongest center positioning, high "edge energy" in 4 directions</li>
        <li><strong>Use cases:</strong> Precision tools, snap coordinates, engineering interfaces</li>
        <li><strong>Why:</strong> Four arms suggest intersection coordinates, perfect for snap guidance</li>
      </ul>

      <h3>4.3 Square (方形)</h3>
      <ul>
        <li><strong>Personality:</strong> Pixel, rigid, digital</li>
        <li><strong>Properties:</strong> Clear horizontal/vertical edges, strongest "grid suggestion"</li>
        <li><strong>Use cases:</strong> Code editors, financial dashboards, data panels</li>
        <li><strong>Why:</strong> Too rigid for free canvas, but perfect for engineering precision</li>
      </ul>

      <h3>4.4 Warning</h3>
      <p>
        Asymmetric shapes (triangles) create strong directionality, 
        breaking background's required <strong>isotropy</strong>. Use cautiously.
      </p>

      <h2>5. Arrangement Patterns</h2>
      
      <p>Same dots, different arrangement → instant context switch.</p>

      <h3>5.1 Orthogonal (正交)</h3>
      <ul>
        <li><strong>Visual structure:</strong> Cross-shaped, rigid and stable</li>
        <li><strong>Effect:</strong> Clear horizontal/vertical guides, eye connects dots into invisible "checkerboard"</li>
        <li><strong>Conveys:</strong> Order and precision</li>
        <li><strong>Use cases:</strong> SaaS panels, code editors, data backends</li>
      </ul>

      <h3>5.2 Staggered (交错)</h3>
      <ul>
        <li><strong>Visual structure:</strong> Diamond/triangle, soft and flowing</li>
        <li><strong>Effect:</strong> Each row shifts half-spacing, dots form equilateral triangles</li>
        <li><strong>Conveys:</strong> Softer and more organic, like fabric texture</li>
        <li><strong>Benefit:</strong> More uniform density (hexagonal close packing)</li>
        <li><strong>Use cases:</strong> Creative products, brand displays</li>
        <li><strong>Note:</strong> Purely decorative - don't try aligning UI elements to staggered grid</li>
      </ul>

      <h2>6. Edge Treatment</h2>
      
      <p>How edges are handled significantly impacts perceived refinement.</p>

      <h3>6.1 Sharp Cutoff vs. Fade</h3>
      <ul>
        <li>Sharp cutoff: texture "crashes" into module border</li>
        <li>Radial mask (CSS mask-image): gradual fade near edges</li>
      </ul>

      <h3>6.2 Fade Intensity Levels</h3>
      <ul>
        <li><strong>Weak:</strong> farthest-corner - vanishing point at furthest corner, max visible area</li>
        <li><strong>Medium:</strong> farthest-side - vanishing point at furthest edge, corners fade first</li>
        <li><strong>Strong:</strong> closest-side - vanishing point at nearest edge, focuses on center</li>
        <li><strong>Invert:</strong> Center hollowed, edges preserved - for central content clarity with decorative edges</li>
      </ul>

      <h3>6.3 Design Integration</h3>
      <ul>
        <li>With dot texture, box shadows often unnecessary</li>
        <li>Keep only 1px light border (#000 / 0.08)</li>
        <li>Result: much cleaner appearance</li>
      </ul>

      <h2>7. Key Design Decisions</h2>
      
      <h3>7.1 For Content/Reading Interfaces</h3>
      <ul>
        <li>Goal: Lightweight, non-intrusive</li>
        <li>Use: Circle + Staggered + Low opacity + Edge fade</li>
      </ul>

      <h3>7.2 For Precision/Tool Interfaces</h3>
      <ul>
        <li>Goal: Emphasize alignment, coordinates, professional tooling</li>
        <li>Use: Cross/Square + Orthogonal + Very low opacity</li>
      </ul>

      <h3>7.3 For Free Canvas Scenarios</h3>
      <ul>
        <li>Challenge: Needs to adapt to zoom, maintain consistent visual weight</li>
        <li>Use: Fixed 1px + Level-of-detail (LOD) + Non-proportional scaling</li>
      </ul>

      <h2>8. Technical Implementation Notes</h2>
      
      <h3>8.1 SVG Pattern (Static)</h3>
      <ul>
        <li>Use for basic backgrounds without interaction</li>
        <li>Lightweight, renders well at all sizes</li>
        <li>Apply CSS mask-image for fade effects</li>
      </ul>

      <h3>8.2 Canvas 2D (Interactive)</h3>
      <ul>
        <li>Required for: Glow effects, mouse hover, animation</li>
        <li>More complex but enables dynamic visual feedback</li>
        <li>Performance: manageable with proper optimization</li>
      </ul>

      <h3>8.3 Animation Effects</h3>
      <ul>
        <li><strong>Glow:</strong> Random pulsing dots (use Math.sin with seed for uniform randomness)</li>
        <li><strong>Scan:</strong> Linear sweep across canvas</li>
        <li><strong>Pulse:</strong> Expanding circle from center</li>
        <li><strong>Hover:</strong> Mouse-reactive intensity (prevent re-renders with useRef)</li>
      </ul>

      <h3>8.4 Common Pitfalls</h3>
      <ul>
        <li>Don't let dots "fatten" with zoom - maintain physical pixel size</li>
        <li>Avoid moiré patterns when dot spacing approaches screen pixel pitch</li>
        <li>Glow animation: use coordinate-based random seed, not index-based (prevents "stripy waves")</li>
        <li>Hover effect: attach to window, not component div (works over other elements)</li>
      </ul>

      <h2>9. Reference Projects</h2>
      
      <ul>
        <li><strong>Aceternity UI:</strong> Next.js + Tailwind, light/dark mode support</li>
        <li><strong>Magic UI:</strong> SVG implementation, full Tailwind customization, glow effect</li>
        <li><strong>React Bits:</strong> Canvas + GSAP interactive patterns, 13 adjustable parameters</li>
        <li><strong>Lightswind:</strong> Fade effects, light/dark mode</li>
        <li><strong>shadcn/ui Backgrounds:</strong> 40+ animated background components, canvas-rendered mouse interaction</li>
      </ul>

      <h2>10. Quick Reference: Parameter Ranges</h2>
      
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Range/Options</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>width/height</td>
            <td>number</td>
            <td>8-32px typical</td>
            <td>16</td>
          </tr>
          <tr>
            <td>cx/cy</td>
            <td>number</td>
            <td>0 to width/height</td>
            <td>1</td>
          </tr>
          <tr>
            <td>cr (radius)</td>
            <td>number</td>
            <td>0.5-2px typical</td>
            <td>1</td>
          </tr>
          <tr>
            <td>shape</td>
            <td>enum</td>
            <td>circle | square | cross</td>
            <td>circle</td>
          </tr>
          <tr>
            <td>mode</td>
            <td>enum</td>
            <td>orthogonal | staggered</td>
            <td>orthogonal</td>
          </tr>
          <tr>
            <td>opacity</td>
            <td>number</td>
            <td>0.03-0.08 (3-8%)</td>
            <td>0.05</td>
          </tr>
          <tr>
            <td>fadeLevel</td>
            <td>enum</td>
            <td>weak | medium | strong</td>
            <td>weak</td>
          </tr>
          <tr>
            <td>effect</td>
            <td>enum</td>
            <td>none | glow | scan | pulse</td>
            <td>none</td>
          </tr>
        </tbody>
      </table>

      <hr />
      
      <p className="text-sm text-muted-foreground">
        <strong>Usage for AI Agents:</strong> This guide is optimized for machine reading. 
        Use it as context when designing dot pattern backgrounds. Key principles: Coverage 1-3%, 
        Shape matches use case, Arrangement affects mood, Edge fade increases refinement.
      </p>
      
      <p className="text-sm text-muted-foreground">
        <strong>Source:</strong> Research documents including Gemini conversation analysis, 
        MagicUI comparison, visual psychology principles (Gestalt, spatial mixing, signal-to-noise ratio), 
        and industry practices from Linear, Vercel, Figma.
      </p>
    </article>
  );
}
