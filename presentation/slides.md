## PWND Passwords API

Klee Thomas

@kleeut
Speaker:

---

## The Problem

Exposed passwords &

Credential Stuffing

Speaker:

The problem that we're facing is that as more and more databases are breached we need a way to protect ourselves against people who have the correct credentials.

In the US the Federal Trade Commission has stated that it wont accept businesses using credential stuffing, where someone reuses credeitials from another breached website as an excuse for damage to customers.

---

## What can we do about it?

---

Force customers to no use common and/or breached passwords.

---

PWND Passwords and Have I Been PWND

Speaker:
Thats where this comes in.
Troy Hunt has released an api that you can send hashed passwords to and it will tell you how many times they have appeared in his collection of breaches.

~1.9 million passwords appear more than 100 times

---

k-Anonymity

---

https://api.pwnedpasswords.com/range/${hash-prefix}

---

## More Info

https://haveibeenpwned.com/Passwords

https://www.troyhunt.com

https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/

---

# Demo
