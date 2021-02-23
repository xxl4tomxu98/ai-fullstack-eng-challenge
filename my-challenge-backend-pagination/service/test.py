graph = [['Home', 'Biology', 'Chemistry', 'Materials', 'Electronics', 'Energy'],
         ['Chemistry', 'Chemical Substances', 'Biochemistry', 'Organic Chemistry'],
         ['Chemical Substances', 'Materials', 'Ions', 'Metals', 'Nonmetals'],
         ['Materials', 'Chemical Substances', 'Natural Materials', 'Manmade Materials']]


# graph = {
#     'Home': ['Biology', 'Chemistry', 'Materials', 'Electronics', 'Energy'],
#     'Che'
# }

def transform(arr):
    dictionary = {}
    for arr1 in arr:
        dictionary[arr1[0]] = arr1[1:]
    return dictionary


print(transform(graph))
