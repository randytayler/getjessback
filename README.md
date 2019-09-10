# Get Jess Back
A short choose-your-own-adventure game for JS13k 2019

The hard part is the dang graphics, I tells ya. They're pseudo-vector, meaning they're a whole bunch of points that I pass to a draw method, which makes fills of a selected color. To save space, I use as few bytes as possible.

What makes it harder is that in order to shave a few bytes off when zipping, I tried to round the points to the nearest ten. That's why they're so blocky.

Some are better than others, but I really didn't have bytes to spare for better art.
