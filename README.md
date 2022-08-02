# Goal Keeper

On github pages: https://alexanderbiba.github.io/goal-keeper

## The Story

My brother and I were looking for a way to motivate ourselves to achieve our daily goals.
We both had a mental list of tasks we wanted to do on a given day, but very often, lacked the motivation to actually get up and do them, or in many cases forgot about them completely.

These tasks ranged from trivial generic tasks such as "Daily Exercise", to more specific such as "Go to the store and buy an HDMI cable" or "Get up at 7am".

We came up with the following method:
- We each prepared a table in Google Sheets with the following columns: Task | Note | Reviewed
- Every day, each of us would come up with a list of tasks for tomorrow
- We would lock in our daily tasks for tomorrow until 12am
- Come tomorrow, we would fill out the note for each task, describing how we actually completed that task
- Each of us would then go over the other's table, make sure that the note makes sense for the given task, and add a checkmark in the Reviewed field for that row
- If there was no note, or if the note did not make sense, we would leave that field blank, or sometimes, paint it red to shame the other person for not completing a task

We would then compete with each other for 30 days, who can get the most check marks.
This gave us motivation to act on our daily personal goals, which in turn, helped us create better habits, and get more things done every day.

After a few days of doing this with Google Sheets, I suggested turning this into a web-application, because there were a few features that we were lacking, for example, locking in the daily tasks was pretty much impossible with Google Sheets.

Goal Keeper is an implementation of this method.

Goal Keeper allows you to designate a "Goal Keeper", lock in tasks for tomorrow, add a note describing how you completed that task, and have your Goal Keeper review, and give you a checkmark if you done right.