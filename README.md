# Goal Keeper

On github pages: https://alexanderbiba.github.io/goal-keeper

## The Story

My brother and I were looking for a way to motivate ourselves to achieve our daily goals.

We both had a mental list of tasks we wanted to do on a given day, but very often, lacked the motivation to actually get up and do them, or in many cases forgot about them entirely.

These tasks ranged from trivial generic tasks such as "Daily Exercise", to more specific such as "Go to the store and buy an HDMI cable" or "Get up at 7am".

We came up with the following method:
- We each prepared a table in Google Sheets with the following columns: Task | Note | Reviewed
- Every day, each of us would come up with a list of tasks for tomorrow, that list had to be locked in until 11:59pm
- Come tomorrow, we would fill out a *Note* for each task, describing how we actually completed that task
- End of day, each of us would go over the other's table, make sure that the note makes sense for the given task, and add a checkmark in the *Reviewed* field for that row
    - If there was no note, or if the note did not make sense, we would leave that field blank, or sometimes, paint it red to shame the other person for not completing a task
- After we've reviewed each other's tasks, we would come up with new tasks for tomorrow, and repeat

We would compete with each other in a 30 days period of time, who can get the most check marks.
This gave us motivation to act on our daily personal goals, which helped us get more things done every day, and subsequently, create better habits.

After a few days of doing this with Google Sheets, I suggested turning it into a web-app since there were a few features that we were lacking, primarily, locking in the daily tasks was impossible with Google Sheets.

Goal Keeper is an implementation of this method.

Goal Keeper allows you to designate a "Goal Keeper", lock in tasks for tomorrow, add a note describing how you completed that task, and have your Goal Keeper review, and give you a checkmark if you done right.
