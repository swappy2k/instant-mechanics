<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep roadside service definitions, validation and message composition in a browser-safe shared module; all WhatsApp destinations use the central site helper to preserve one configurable business number.
- Roadside enquiries use the existing shared dialog and button controls, with no storage or booking backend; customer details are passed to WhatsApp only after explicit validated submission.
