class HashTable:
    def __init__(self, size):
        self.size = size
        self.arr = [[] for i in range(self.size)]

    def gethash(self, key):
        h = 0
        for char in key:
            h += ord(char)

        return h % self.size

    def __setitem__(self, key, value):
        h = self.gethash(key)
        found = False
        for idx, item in enumerate(self.arr[h]):
            if len(item) == 2 and item[0] == key:
                self.arr[h][idx] = (key, value)
                found = True
                break
        if not found:
            self.arr[h].append((key, value))

    def __getitem__(self, key):
        h = self.gethash(key)
        if len(self.arr[h]) == 0:
            print("Empty hash")
        else:
            for x in self.arr[h]:
                if x[0] == key:
                    print(x[1])



ht = HashTable(10)
ht['mar 1'] = 'march 1st'
ht['mar 1']
