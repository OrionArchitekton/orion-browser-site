# Product demo provenance

The 59.6-second product demo reuses Dan's recording and the completed edit from
October 12, 2026. The MP4 is unchanged; no voice synthesis or new capture was
needed. The underlying CLI/browser proof used public orion-browser v0.1.0 with
scripted workers and fictional local accounts. The edit replays actual captures;
it does not depict continuous live footage or model reasoning.

The public assets live in `public/media/`. The page's single video definition in
`constants.ts` supplies the React page and initial HTML, including the transcript
and disclosure. Captions are also burned into the reused recording. The optional
WebVTT track supplies the same English text for native player accessibility.

The MP4 SHA-256 is
`311ee487da0b78e16422a8dc98e6e6743846d9226e7ce8574f6249c49470c630`.
It is 1920 by 1080, 30 fps, with a 59.6-second runtime and an AAC audio track.
Verify by computing the hash, probing the streams, decoding the full file, and
testing playback and seeking at the Works URL.

Refresh when browser ownership, handoff behavior, supported setup or the visible
call to action materially changes. A patch release with the same demonstrated
workflow can reuse this recording after checking its claims against that release.
Review existing recordings before generating replacements. Preserve the old
recording and any failed render evidence. Never include real signed-in profiles,
private endpoints, account details or operational identifiers in public media.

For rollback, restore the previous site deployment or revert the demo change.
The source release, guide and hub routing are independent of this media asset.
