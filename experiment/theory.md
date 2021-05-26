**Problem 1**

We shall try to calculate the factorial of a number and then find out the number of digits in it.
1! = 1
2! = 1*2 = 2
3! = 1*2*3 = 6
4! = 1*2*3*4 = 24
.
.
.
10! = 3628800
So n! means multiplying all the numbers from 1 to n. For the sample input, 52, we can see from the sample output that the factorial of 52 is 68 digits and this cannot fit in long long data type in C. You may now attempt to store the answer in a string and do multiplication operation on strings(by multiplying each digit of the string individually). Now, let us see how many operations do we need for multiplying 2 strings. Consider 11!, 11! = 11*10!, assume we already have 10! stored in a string and 11 stored in a string. Now, to calculate 11! from 10! we need to multiply each digit of 11 with each digit of 10!, i.e it would take No_digits(11) * No_digits(3628800) = 2*7 = 14 operations. We consider only multiplication operations(we also have to consider addition operations for each of the biproducts and carries).


Similarly 53! would take 2*68=136 operations from 52!.
52! would take 2*67 = 134 operations from 51!
51! would take 2*65 = 130 operations from 50!.
We can see that there would be a operations required for calculating 53! (No_operations = 136+134+130+...+1). Also in 1000000! the number of digits is 5565709, so we would require large amount of storage and both these difficulties make calculation of N! hard.

Is there any way to find the number of digits without actually calculating N!? Let us consider a simple problem of finding the number of digits in a number N.Consider N = 12 , we can also write this as 0.12*102 which is a 2 digit number . Consider N=125 , which can be written as 0.125 *103 which is a 3 digit number. Evidently calculating the exponent of 10 in the scientific notaion and gives the number of digits.
For any N,
N=x*10exp
=> log10(N) = log10(x) + exp.
For n=95,
log10(95) = log10(0.95)+exp, since 95 = 0.95 *102
N = x*10exp , x < 1
Taking step on both sides.
=> step(log10(N)) = step(log10(x)+exp)
=> step(log10(N)) = exp-1
=> exp = step(log10(N))+1
=> No_digits(N) = step(log10(N))+1


Applying the above formula to calculate the number of digits of N! gives
No_digits(N!) = step(log10(N!) ) +1
=> No_digits(N!) = step(log10(N*(N-1)*(N-2)*(N-3)...*2*1)) + 1
=> No_digits(N!) = step(log10(N) + log10(N-1) + log10(N-2) + ...+log10(2) + log10(1) ) +1

log10(N) can be easily calculated by the log10 function in math.h.


**Problem 2**

Let us observe the zeroes in the factorial of a few numbers.
4!=24 (0 zeroes)
5!=120 (1 zeroes)
6!=720 (1 zeroes)
7!=5040 (1 zeroes)
8!=40320 (1 zeroes)
9!=362880 (1 zeroes)
10!=3628800 (2 zeroes)
11!-14! (2 zeroes)
15! (3 zeroes)


We can observe that for every multiple of 5, we have a zero being added to the product. This is due to the multiplication of 5 with an even number in the product. So, our problem simplifies to counting the number of 5's in the factors of the number to be calculated. Let us formalize the proof.

Let p be a prime number.
n!=1×2×…×(n−1)×n
We see that any integer m such that 0 < m ≤ n which is divisible by pj and not p(j+1) must be counted exactly j times. That is: once in ⌊n/p⌋, once in ⌊n/(p2)⌋, …, once in ⌊n(pj)⌋. And that is all the occurrences of p as a factor of n!.
Thus:
μ(No. of occurences of p)=⌊n/p⌋+⌊n/(p2)⌋+⋯+⌊n/(pj)⌋
Ex:Number of zeroes in 25! = Number of occurences of 5 in 25! = (⌊25/5⌋+⌊25/(5^2)⌋)=5+1=6


