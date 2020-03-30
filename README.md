# Counter with stopwatch

![](extras/counter-with-stopwatch.jpg)


## Description

Use this field plug-in to add a stopwatch and a counter to your field. The stopwatch can display the elapsed time in seconds, deciseconds, centiseconds, and milliseconds. The counter can keep track of the number of occurrences of something. You can reset the current value of either the stopwatch, or the counter, or both. Both values are stored in the form data separated by a space:

`[count] [time (in ms)]`

An answer is not set until the stopwatch is stopped. The value is re-stored whenever the timer is stopped, or when the counter value is changed while the stopwatch is stopped. They can come back and continue where they left off with the same amount of time passed and the same count value.

## Default SurveyCTO feature support

| Feature / Property | Support |
| --- | --- |
| Supported field type(s) | `text`|
| Default values | Yes |
| Custom constraint message | No |
| Custom required message | No |
| Read only | No |
| media:image | Yes |
| media:audio | Yes |
| media:video | Yes |
| `number` appearance | No |
| `numbers_decimal` appearance | No |
| `numbers_phone` appearance | No |
| `show_formatted` appearance | No |

## How to use

**To use this field plug-in as-is**, just download the [counterwithstopwatch.fieldplugin.zip](counterwithstopwatch.fieldplugin.zip) file from this repo, and attach it to your form.

To create your own field plug-in using this as a template, follow these steps:

1. Fork this repo
1. Make changes to the files in the `source` directory.

    * **Note:** be sure to update the `manifest.json` file as well.

1. Zip the updated contents of the `source` directory.
1. Rename the .zip file to *yourpluginname*.fieldplugin.zip (replace *yourpluginname* with the name you want to use for your field plug-in).
1. You may then attach your new .fieldplugin.zip file to your form as normal.

## Parameters

| Key | Value |
| --- | --- |
| `time-unit` (optiona) | This is the unit of time measurement that will be displayed. Possible values are `s` (for seconds), `ds` (for deciseconds), `cs` (for centiseconds), or `ms` (for milliseconds).|

If no parameters are supplied, seconds will be shown by default.

## More resources

* **Test form**  
[extras/test-form](extras/test-form)
* **Developer documentation**  
Instructions and resources for developing your own field plug-ins.  
[https://github.com/surveycto/Field-plug-in-resources](https://github.com/surveycto/Field-plug-in-resources)
* **User documentation**  
How to get started using field plug-ins in your SurveyCTO form.  
[https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html](https://docs.surveycto.com/02-designing-forms/03-advanced-topics/06.using-field-plug-ins.html)