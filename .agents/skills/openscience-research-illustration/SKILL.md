---
name: openscience-research-illustration
description: Plan and refine evidence-grounded research illustrations for OpenScience through Hermes and Chat image generation, using structured briefs, source-scoped visual references and reusable art directions. Use for paper illustrations, scientific concept images and research covers; quantitative plots require a data renderer.
metadata:
  version: "1"
---

# OpenScience research illustration

Create a readable scientific image with a deliberate composition. The source supplies the science; the user's accepted images and feedback guide the art. Chat image generation is the current primary execution path. Keep Codex CLI available as a reserve; never select it automatically or consume its quota as a fallback.

## Scientific intent

First select one useful scientific explanation from the upstream reviewed analysis and its complete original passages. This stage chooses what the reader should understand, not an artistic style. A whole-paper conclusion often contains several independent ideas; select one coherent relationship instead of compressing all of them into one picture. Follow an explicitly requested number of pictures, otherwise prefer one. Preserve complete source context: do not split equations from definitions or qualifiers to fit a short quotation field.

For each selected explanation, establish the domain, the minimum subjects and relationships, exact short labels, essential conditions and the meaning of every intended visual mark. Use complete original passage identifiers; the server supplies their actual text. The passage must support the full statement, including qualifiers. Reviewed summaries supply context but do not override a conflicting or narrower original passage. Unsupported details should be left out or reported as missing, not repaired from general knowledge.

In the encoding, distinguish physical position, parameter coordinates and logical groupings. Decide what each axis, boundary, distance, arrow or region would mean before designing its appearance. A meaningful color has one consistent role. Quantitative curves and data-derived shapes require a data renderer; do not ask an image model to invent their values or extrema. Choose a different supported explanatory role when a faithful illustration is not available from the supplied sources.

The science fields and encodings are carried into art direction unchanged. Later stages can arrange and style them but cannot introduce another scientific idea, equation, numerical example or relationship. An invalid scientific intent must return for correction before image generation.

## Planning

Design the already selected scientific intent. The upstream literature analysis and its reviewed original passages establish what was studied, what was established, how it works, and under which conditions. Its visual explanation may be a physical arrangement, mechanism, comparison, classification or another relationship; do not assume every paper needs the same kind or number of pictures. A generated conceptual illustration cannot replace a quantitative data renderer.

Identify what must remain invariant before considering style: the scientific domain, source-supported subjects, relationships, quantities and essential conditions. A reference image is visual guidance, not evidence for the new paper. A changed upstream analysis invalidates the old visual intent; derive a new one rather than preserving a stale picture.

Produce a structured illustration brief, not a long drawing monologue:

- `message`: one concise scientific takeaway.
- `domain`: the single domain depicted in this image: real-space, wavevector-space, time, frequency, parameter-space or conceptual.
- `subjects`: the scientific elements and relationships needed for the takeaway, each linked to the supplied Claim and original passage. A description can establish a relationship or condition, not just name an object. Select supplied passage identifiers; the server resolves them to exact evidence, never manufacture a quotation.
- `composition`: focal subject, relative scale, reading path, placement of labels and meaning of visual encodings.
- `treatment`: concrete material, palette, line/edge treatment and type hierarchy; select a relevant direction from [art-directions.md](references/art-directions.md).
- `labels`: the exact short visible text. Essential symbols and conditions must survive intact. Put titles, long equations and derivations in the article unless indispensable to this picture.
- `constraints`: the few source conditions and visual exclusions needed to prevent a wrong reading.

Every scientific relationship, variable, formula and condition in `message`, `composition`, `labels` or `constraints` must be established in at least one subject description and supported by that subject's original basis. The remaining composition and treatment decisions concern visual design only. An object existing in the source does not establish an invented relationship between objects.

Resolve the visual encoding before arranging the composition. For each meaningful axis, distance, region, line, arrow or color, state which sourced subject/relationship it represents and in which domain. Physical position, a parameter coordinate and a logical grouping are different encodings; do not turn one into another for visual richness. Calling a mark symbolic does not excuse a false mapping. Keep one consistent meaning per color. Put semantic color/mark meanings in `composition`; keep `treatment` to material, palette, edges and typography. Prefer a narrower takeaway over a collage of loosely related source facts. Each basis must support the complete subject description, including its qualifiers; remove unsupported extensions instead of attaching a nearby quotation.

Keep independent scientific domains distinct. Coordinate dimensionality, units and variables must agree with their stated domain. When an explanation needs several domains, use separate scenes/images with explicit relationships, rather than blending axes and gradients. Every mark that looks like data needs source support. Texture belongs to the artistic treatment and must not imply a measured field.

Choose composition from the relationship, not the style name. A process may use a sequence; classification may use a domain partition; a cover may use one expressive subject. Do not turn every paper into a process diagram, a decorated circle or a grid of summary cards. A small label budget is a reason to simplify the explanation, not to shrink text or drop an essential condition.

For a revision, distinguish a local correction from a rejected overall design. Retain accepted aspects and unaffected science. Change the hierarchy and composition when the user rejected them; changing a background or recoloring a motif is insufficient. Preserve useful reference qualities without copying unrelated scientific content. Watercolor is one supported direction, not a default for every paper.

Before submitting a brief, read its subjects, labels and constraints together: they must use consistent variables, domains and assumptions. Remove a formula if the image does not need it; never invent or approximate one. The brief should fit the actual image transport's prompt budget without a second model having to reinterpret it.

## Scientific review

Review the final proposed image against the complete upstream analysis and original passages, including meanings introduced by composition and treatment. Citation identity establishes where text came from; it does not establish that a description follows from it. Check each subject, relationship, condition, formula and visible label, then the meaning of axes, distances, regions, arrows, curves and semantic colors. A layout must not turn a logical relationship into a physical trajectory or invent data from an equation.

Use the existing Chat scientific review capability once for the final candidate. It may accept the candidate, return a complete corrected brief, or report the missing support. A correction can narrow the visual explanation and remove unsupported marks while preserving the user's accepted art qualities. Resolve the corrected sources against current evidence and compile the corrected brief directly; do not send it through another creative rewrite. Keep the review attached to the actual task, version, source evidence and candidate in internal provenance. A missing, ambiguous or unusable review does not authorize image generation. Scientific review is separate from the user's aesthetic approval.

## Execution

Use the existing Hermes task, source, permission and approval workflow. MiniMax's science and art planning stages produce a candidate; Chat reviews its complete scientific meaning before the final brief is saved. Generate from that saved structured brief; compile its fields into the drawing request without another free-form scientific rewrite. Do not claim that JSON validity or a model's acceptance proves scientific or artistic quality.

When the user specifies an existing image as a reference, pass its actual bytes through the authorized Chat reference-image path. Restrict it to the allowed research object/version. Record the reference asset and its existing content identity; state whether it is style guidance or scientific source material. This skill's default reference role is style only. If the transport cannot attach it, report that limitation rather than claiming a text description is reference-image generation.

Generate one selected candidate through Chat, inspect the actual returned image at its product display size, and assess science, labels, visual hierarchy and fidelity to the selected reference separately. Retain the original and candidates. A failed or ambiguous send must use the existing recovery rules; do not regenerate just because the reply was slow. Stop a scientifically misleading candidate from entering publication.

If a correction is needed, change the relevant structured field or select a different reference. Do not append another round of universal prohibitions. Keep case-specific preferences in the task/brief, not in this skill. Update reusable guidance only for demonstrated general failure modes.

## References and reuse

Use [art-directions.md](references/art-directions.md) for concrete art direction. The installed MIT-licensed `baoyu-article-illustrator`, `baoyu-cover-image` and `baoyu-infographic` provide original composition and style references; Hermes loads relevant design sections only. Scientific constraints and the user's current request take precedence over template defaults. `baoyu-image-gen` informed reference-image and execution separation; it does not itself provide our Chat webpage transport. Do not install or switch providers merely because an upstream example uses one.
