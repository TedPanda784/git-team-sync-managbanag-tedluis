\# WORKFLOW.md



\## What did the rejected push error message tell you, and why did it happen?



Both rejections gave the same message: `! \[rejected] ... (fetch first)`, followed by

`Updates were rejected because the remote contains work that you do not have locally.`

Git compares the commit my local branch thinks the remote is at against what the

remote actually points to. If they don't match, Git refuses a plain push rather than

silently overwriting commits, because doing so would throw away whatever the other

side had pushed.



It happened both times for the same underlying reason: someone else pushed to

`feature/loyalty-points` while I was working from an older copy of that branch.



\- Task 2: Clone B committed the rounding change while still sitting on the commit

&#x20; from before Clone A's VIP bonus push. Clone B's local branch was one commit

&#x20; behind `origin/feature/loyalty-points`, so the push was rejected.

\- Task 4: Clone A committed the minimum-point change without fetching first, so it

&#x20; was still unaware of Clone B's merge commit that had already reached the remote.

&#x20; Same rejection, same cause — a stale local branch trying to push past history it

&#x20; hadn't fetched.



\## What's the actual difference between how you resolved Task 3 (merge) vs Task 4 (rebase)?



\*\*Task 3 (merge):\*\* `git fetch` + `git merge origin/feature/loyalty-points` pulled

the remote's new commit into Clone B's branch and created a new merge commit with

two parents. Both branches' commit histories stayed exactly as they happened —

Clone A's VIP bonus commit and Clone B's rounding commit are still two separate,

unaltered commits, joined by the merge commit. The resulting graph shows the real,

diverging history.



\*\*Task 4 (rebase):\*\* `git fetch` + `git rebase origin/feature/loyalty-points`

replayed Clone A's local commit as if it had been written on top of the latest

remote history, instead of on top of the older commit it was originally based on.

This rewrote Clone A's commit (new hash, new parent) and produced a linear history

with no merge commit. Because the rebase moved my commit to sit cleanly on top of

the already-pushed history, the push afterward was a fast-forward — no force

needed.



The practical difference: merge preserves history exactly as it happened (extra

merge commits, a branching graph); rebase rewrites local commits to sit on top of

the latest remote history and keeps the log linear, at the cost of changing commit

hashes for anything that gets rebased.



\## What one habit would have avoided both rejected pushes in this lab?



Running `git fetch` (or `git pull`) right before starting new work on a shared

branch — not just right before pushing. Both rejections happened because a commit

was made against a local branch that was already stale by the time work started.

Fetching first wouldn't eliminate every possible conflict (two people can still

edit the same lines at the same time), but it would have surfaced the divergence

immediately, before investing time in a change built on outdated code.



\## Which approach — merge or rebase — would you default to on a shared team branch, and why?



Merge. On a branch other people are actively pushing to, rebase rewrites commit

history — and rewritten commits are a problem the moment someone else already has

the original commits checked out or has branched off them. If a teammate had

pulled Clone A's pre-rebase commit before I rebased it, their local history would

diverge from the rewritten version on the remote, and they'd hit confusing

conflicts or need `--force` pushes to fix it. Merge keeps history additive and

safe for everyone sharing the branch. I'd reach for rebase mainly on a private

feature branch, before it's shared, to clean up commits.

