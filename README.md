# Fightgame

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Project
```mermaid
graph LR;
    Us((UserService)) --> Gs((GameService));
    Gs --> f(features);
    f --> Gs;
    classes --> Gs;
    enums --> Gs;
    enums --> Us;
    interfaces --> Gs;
```
## Classes
```mermaid
graph TD;

I(Item) --> Ar[Armor];
I --> Po[Potion];
I --> Sw[Sword];
st(string) --> idName((idName)) --> |type_name|I;
s(string) --> name((name)) --> I;
str(string) --> description((description)) --> I;
n(number) --> attack((attack)) --> I;
nu(number) --> health((health)) --> I;
num(number) --> shield((shield)) --> I;
numb(number) --> price((price)) --> I;
image((image)) --> I;
Im(Image) --> image;
string1(string) --> src((src)) --> Im;
string2(string) --> alt((alt)) --> Im;
```

```mermaid
graph TD;
name((name)) --> Mo(Monster);
description((description)) --> Mo;
st(string) --> name
s(string) --> description;
image((image)) --> Mo;
Im(Image) --> image;
string1(string) --> src((src)) --> Im;
string2(string) --> alt((alt)) --> Im;
spezies((spezies)) --> Mo;
MS(MonsterSpezies) --> spezies;
stats((stats)) --> Mo;
number1(number) --> attack((attack)) --> stats;
number2(number) --> life((life)) --> stats;
number3(number) --> shield((shield)) --> stats;
buttonLeft((buttonLeft)) --> Mo;
buttonRight((buttonRight)) --> Mo;
xp((xp)) --> Mo;
number(number) --> xp;
CB(CardButton) --> buttonLeft;
CB --> buttonRight;
str(string) --> content((content)) --> CB;
bo(boolean) --> show((show)) --> CB;
func(function) --> click((click)) --> CB;
```

## List of all Items

### Swords
- sword_wood
- sword_stone
- sword_copper
- sword_iron
- sword_gold

### Armors
- armor_leather
- armor_wood
- armor_copper
- armor_iron
- armor_gold
- armor_rubber

### Potions
- potion_heal
- potion_strength