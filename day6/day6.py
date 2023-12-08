def f(t,d):
    ans = 0
    for x in range(t+1):
        dx = x*(t-x)
        if dx>=d:
            ans += 1
    return ans

ans = 1
for i in range(1):
    ans *= f(40828492, 233101111101487)

print(ans)