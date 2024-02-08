# In the line 2 we have a reserved word called on, when we use on it's related to event for trigger the workflow, we have some events for trigger this.
# In the line 8 we use other reserved word, run, with run me can made action, the action is a applicantion who have responsability of the perform frenquently task
# Diff the command, when we use an action, we use the reserved word called "uses"
# If you verify the documentation you can find other configuration for these actions https://github.com/marketplace/actions/checkout
# if we need the jobs running in parallel we doesn't need put anything in the code, but, if we need the pipeline running one job each other we need use the "needs" reserved word to made this. If the dependencie one job faield all the workflow stoped