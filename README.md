# intelli-buddy-executor

This is the executor extension for [`intelli-buddy`](https://github.com/misbiheyv/intelli-buddy).

## How to use it

### 0 step
Setup your configuration file for [`intelli-buddy`](https://github.com/misbiheyv/intelli-buddy)

### Well, now, you can configure the extension in the `.vscode/settings.json` file:
- `intellibuddy.configAbsolutePath` - you can set the absolute path to the `IntelliBuddy` configuration file
- `intellibuddy.showDiff` - shows git diffs between the original version and the processed one (by default `true`)

### Now you can try to use it:
- Click `ctrl/cmd+P`
- Start to write and select one of the options
	- `IntelliBuddy: Processing` - get `showDiff` param from your config
	- `IntelliBuddy: Processing Without Diff`
