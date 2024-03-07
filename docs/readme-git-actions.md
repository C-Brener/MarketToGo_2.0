# GitHub Actions Workflow Configuration Guide

## Event Triggers
In line 2, the keyword "on" signifies an event trigger for initiating the workflow. Events can include various actions to trigger the workflow.

## Action Execution
Line 8 employs the reserved word "run" to execute actions. Actions represent applications responsible for performing recurring tasks. When defining actions, the keyword "uses" is utilized.

For more configuration options regarding actions, refer to the [GitHub Actions documentation](https://github.com/marketplace/actions/checkout).

## Job Execution Control
If parallel job execution is required, no additional code is necessary. However, for sequential pipeline execution, the "needs" keyword is utilized to establish dependencies between jobs. If a job fails, the entire workflow is halted.

## Pipeline Context
Within the Pipeline context, the "trigger" property plays a crucial role. It allows the user to determine the execution behavior of the pipeline. Multiple triggers can be added to a single workflow.

## GitHub Context
The GitHub context provides access to essential information within GitHub repositories, including PR details, references, and commits. Utilizing the GitHub context, users can incorporate relevant information into their workflow steps or other jobs. Refer to the example expressions in `output.yml` and `test_coverage.yml` for more details.

Learn more about GitHub Actions contexts and expressions in the [GitHub Actions documentation](https://docs.github.com/en/actions/learn-github-actions/contexts).

# Github Events 

## Available Events
We have access a some events to the github actions: push, pull_request, create, fork, issues, issue_comment, watch, discussion, many more events
Learn more about GitHub Actions events in the [GitHub Actions Events]( https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

## Push Event 
* Is an event trigger based when we have a new commit in the branch.   
* In github actions this events is called the "filters", because with this event we can choiche what the branch we will trigger the workflow.
* You can filter you will trigger the workflow based in the paths filter, where workflow is start if the all acceptance criteria are correct.
    * Learn more about GitHub Actions Push in the [GitHub Actions Push Event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push).


## pull_request 
* Within the events, we have Activity Types, which will be triggered when we have a specific activity.
* If we need an example, you can access in this [commit](https://github.com/C-Brener/MarketToGo_2.0/commit/6d9dc9930d545045536305b355f9378487764e19).
* By default, pull request based on fork doesn't trigger the pipelines, and this occurs beacause everyone can be create a fork of your repository and create an pull request, so, if you don't have this rules, everyone can be trigger your actions.
    * If you have a collaborators in your project, they people can be open a PR and runs the actions

## Cancelling and Skipping Workflows
* If you need a specifically commit don't trigger the wotkflow you can use reserved word for skip it, you need put this reserved word in your commit, "[skip ci]", with this, you can block the action runs on this commit. Exist other reserved word for do the same thing. Verify in this [link](https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs).

# Github Jobs Artifacts

## Deep Dive 
* The central idea of the Job Artifact is to save and share data between jobs in a workflow, basically with an artifact you can reuse the result of one job in another.
* With an artifact it's possible generate a build of an app, an website files.
* With artifact, you can use as manually way, doing the dowload of an app, or automatically publish the result in AppCenter or doing the deploy.

## Upload Artifact
* This is an action in which you can take a specific file or folder and compress it in order to reuse it at another time. The idea is to reuse it to spend less time on other work.
* When you use it, you need to configure some property:
     * path: What is the path you want to upload through.
     * rentation-day: By default all the artifacts are retained for 90 days, but you can change it and set other period.
     * Overwrite: With this property, you can overwrite the oldest value that has the same name as the current value.

## Download Artifact 

