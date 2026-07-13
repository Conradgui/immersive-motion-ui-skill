# C05. 内容 / 媒体

### Shared brief

Design a searchable digital archive for a local museum. Visitors need to find objects, read their history, inspect images and provenance, and follow a curator-created path across related works.

### Locked fixture

This fixture contains 合成测试数据: 1,200 catalog records; title, maker, date range, material, dimensions, acquisition source, rights, description, and image caption; three featured records include complete provenance; one twelve-object curator path is titled River, Trade, and Daily Life; search supports maker, material, and date. Before 和 After 只使用本 fixture，不新增 essays, audio, maps, donations, or community stories.

### Before

This is a plausible visual archive: a magazine-like masthead, a masonry image wall, category chips, and an overlay record viewer. Titles appear on hover, while provenance and caption sit at the bottom of the overlay.

```text
Masthead: museum archive / category chips
Masonry wall: images with hover titles
Overlay: large image / description / metadata below
Featured strip: twelve images from curator path
```

It supports browsing, but it makes visual similarity the primary structure and weakens search, citation, deep links, and reading continuity.

### After

Separate two valid jobs without splitting the collection: a searchable catalog and an authored curator sequence. Each record receives a stable page with title, maker, date, material, caption, provenance, rights, and related path context.

```text
Archive header: search / maker / material / date / result scope
Results: stable image / title / maker / date / material
Record: image + caption / core facts / provenance / rights / related objects
Curator path: twelve ordered records with chapter context and return position
```

The visual system may still be expressive, but structure and captions encode real archival relationships.

### Causal delta

| # | Failure | Intervention | User outcome |
| --- | --- | --- | --- |
| 1 | Hover titles and image shape control discovery. | Show searchable text fields and stable result metadata. | Users can find records by known facts and browse without hover. |
| 2 | Overlay records have weak URLs and reading continuity. | Give each record a stable page and preserve return scope and position. | Records can be cited, shared, revisited, and compared reliably. |
| 3 | The curator path is an unlabeled image strip. | Preserve its twelve-object order with chapter context and links back to records. | Authored interpretation coexists with catalog truth instead of replacing it. |

### Why the after is better

The after respects both retrieval and interpretation using the same records. It makes provenance and rights first-class without flattening the curator's voice. Switch toward a publication-led reading system when long essays, transcripts, or issues become the primary content rather than catalog records.

### When not to apply

Do not impose catalog density on a small exhibition microsite whose main job is a single guided story. Conversely, do not use the curator sequence as the only navigation for a research archive.

### Overcorrection risk

Metadata rigor can make the archive feel administrative and suppress visual discovery. Keep generous image inspection and authored paths, but make them additive to stable records rather than substitutes.

### Responsive

On mobile, place search and active filters before results, keep record facts adjacent to the relevant image, and preserve the user's return position. Do not collapse provenance or rights into inaccessible hover states.

### Motion

Use restrained transitions to preserve result-to-record and chapter continuity. Avoid scroll effects that move captions away from images. Reduced motion should retain ordering and return position without animated travel.

### Accessibility

Use descriptive record links, accurate image alternatives, explicit captions and rights, semantic search controls, heading hierarchy, keyboard-operable filters, and announced result counts.

### Performance

Serve image variants by display size, lazy-load below-fold results, keep result dimensions stable, and avoid loading all 1,200 records or full-resolution images into the initial page.

### Evidence status

- browser: `NOT EXECUTED`
- responsive: `NOT EXECUTED`
- motion: `NOT EXECUTED`
- accessibility: `NOT EXECUTED`
- performance: `NOT EXECUTED`
- reasoning fixture: `PASS` for locked-content and causal-contract review only

### Source and localization

Original Core case. It combines reading-system, archive, caption, attribution, and deep-link mechanisms without reusing any reviewed publication identity, layout, copy, or image.
