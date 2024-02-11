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
* 

