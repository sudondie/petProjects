import numpy as np
import math as m

p = 1
v = 11
z = np.array([0.1, 0.2])
eps = 0.1


# Градиент исходной функции
def F(z, p, v):
    aux = np.sum(z ** 2)
    n = len(z)
    z0 = np.matrix([np.arange(1, n + 1)])
    return np.reshape(2 * z * v + 4 * z ** 3 + 10 * p * m.cos(aux) * 2 * z - 5 * z0, (n, 1))


# Матрица Якоби
def J(z, p, v):
    n = len(z)
    j = np.zeros((n, n))
    aux = np.sum(z ** 2)
    for i in range(0, n):
        for k in range(0, n):
            if i == k:
                j[i][i] = 2 * v + 12 * z[i] ** 2 + 10 * p * 2 * m.cos(aux) - 10 * p * 2 * z[i] * 2 * z[i] * m.sin(aux)
            # диагональные слагаемые
            elif i != k:
                j[i][k] = -10 * p * 2 * z[i] * m.sin(aux) * 2 * z[k]
    # недиагональные слагаемые
    return j


def Jnum(z, p, pog, v):
    n = len(z)
    jnum = np.zeros((n, n))
    zpog = z
    f0 = np.array(F(z, p, v))
    for j in range(0, n):
        zpog[j] = z[j] + pog
        fpog = np.array(F(zpog, p, v))
        for i in range(0, n):
            jnum[i][j] = (fpog[i][0] - f0[i][0]) / pog
        zpog[j] = z[j]
    return jnum


# Метод Ньютона
def newt(z, p, eps, v):
    n = len(z)
    z1 = np.reshape(z, (n, 1)) - np.dot(np.linalg.inv(J(z, p, v)), F(z, p, v))
    j = 1
    while np.linalg.norm(z1 - np.reshape(z, (n, 1))) >= eps and j < 30:
        z = np.reshape(z1, (1, n))
        z1 = np.reshape(z, (n, 1)) - np.dot(np.linalg.inv(J(z, p, v)), F(z, p, v))
        j += 1
        z = z1
    return j, z


def newt_jnum(z, p, eps, v):
    n = len(z)
    z1num = np.reshape(z, (n, 1)) - np.dot(np.linalg.inv(Jnum(z, p, 10 ** (-8), v)), F(z, p, v))
    j = 1
    while np.linalg.norm(z1num - np.reshape(z, (n, 1))) >= eps and j < 30:
        z = np.reshape(z1num, (1, n))
        z1num = np.reshape(z, (n, 1)) - np.dot(np.linalg.inv(Jnum(z, p, 10 ** (-8), v)), F(z, p, v))
        z = z1num
    return z


print(newt(z, p, eps, v))
