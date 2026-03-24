import re

with open("styles.css", "r") as f:
    css = f.read()

# 1. Update variables
css = css.replace(""":root {
  --bg-primary: #050505;
  --bg-secondary: #0a0a0a;
  --accent-cyan: #00f2fe;
  --accent-purple: #4facfe;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --border-color: rgba(255, 255, 255, 0.08);
  --glass-bg: rgba(255, 255, 255, 0.02);""", """:root {
  --bg-primary: #ffffff;
  --bg-secondary: #fafafa;
  --accent-cyan: #0284c7;
  --accent-purple: #4f46e5;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: rgba(0, 0, 0, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.8);""")

# 2. Update grid backgroud
css = css.replace("rgba(255,255,255,0.02)", "rgba(0,0,0,0.03)")

# 3. Update button glows
css = css.replace("rgba(0, 242, 254, 0.3)", "rgba(2, 132, 199, 0.3)")
css = css.replace("rgba(0, 242, 254, 0.1)", "rgba(2, 132, 199, 0.1)")

# 4. Update button glass hover
css = css.replace("rgba(255, 255, 255, 0.05)", "rgba(0, 0, 0, 0.03)")
css = css.replace("rgba(255, 255, 255, 0.2)", "rgba(0, 0, 0, 0.1)")
css = css.replace("rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)")

# 5. Fix hardcoded colors to text-primary where appropriate
css = css.replace("color: #fff; border: none;", "color: #ffffff; border: none;") # keep btn-primary white text
css = css.replace("color: #fff;", "color: var(--text-primary);")
# Revert primary button text (btn-primary has "color: var(--text-primary); border: none;" now if it was hit, let's fix that)
css = css.replace(".btn-primary {\n  background: linear-gradient(to right, #00c6ff, #0072ff);\n  color: var(--text-primary); border: none;\n}", ".btn-primary {\n  background: linear-gradient(to right, #00c6ff, #0072ff);\n  color: #ffffff; border: none;\n}")
css = css.replace(".cal-time:hover { background: var(--accent-purple); color: var(--text-primary); }", ".cal-time:hover { background: var(--accent-purple); color: #ffffff; }")

# Revert specific color for tags
css = css.replace("color: var(--text-primary);\n  padding: 0.5rem 1.25rem;\n  border-radius: 100px;", "color: var(--accent-cyan);\n  padding: 0.5rem 1.25rem;\n  border-radius: 100px;")

# 6. Contact form background
css = css.replace("background: rgba(0,0,0,0.2);", "background: rgba(0,0,0,0.03);")
css = css.replace("background: rgba(0,0,0,0.5);", "background: rgba(0,0,0,0.05);")

# 7. Add subtle box-shadows to glass items for light mode so they pop out
css = css.replace("border: 1px solid var(--border-color);", "border: 1px solid var(--border-color);\n  box-shadow: 0 4px 20px rgba(0,0,0,0.02);")
css = css.replace("background: rgba(0,0,0,0.3);", "background: rgba(0,0,0,0.02);") # hero features

with open("styles.css", "w") as f:
    f.write(css)

with open("index.html", "r") as f:
    html = f.read()
    
html = html.replace('<body class="dark-theme">', '<body>')
with open("index.html", "w") as f:
    f.write(html)

print("Done")
