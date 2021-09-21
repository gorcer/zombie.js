const Zombie = require("./Zombie");

function Lostland(dimension) {




    // Инициализация
    this.dimension = dimension;
    
    this.map = [];
    // Делаем пустую карту
    for(i=0;i<dimension;i++)
        for(j=0;j<dimension;j++)
            this.map[i,j]=false;
    this.zombies=[];
    this.creatures=[];





    // Метод размещения нового существа
    this.place = function(persons) {
        
        persons.forEach(person => {
            this.map[person.x][person.y]=person;
            
            if (person instanceof Zombie) {
                person.id = this.zombies.length;
                this.zombies.push(person);
            } else {
                person.id = this.creatures.length;
                this.creatures.push(person);
            }
        });
    }


    // Установка сервиса хождения по карте
    this.setStepService = function(stepService) {
        this.stepService = new stepService(this.map, this.dimension);
    }

    // Установка сервиса заражения
    this.setBloodService = function(bloodService) {
        this.bloodService = new bloodService(this);
    }

    // Метод запуска
    this.bringANight = function(daysToSurvie) {
        var n=0;
        while(this.creatures.length > 0 && n < daysToSurvie) {
            this.zombieWalk();
            n++;

            console.log('Day ' + n + ', zombies '+this.zombies.length + ', creatures ' + this.creatures.length);
        }
    };

    // Итерация хождения зомби и заражения существ
    this.zombieWalk = function() {
        
        
        var result;
        var zombiPath=[]; // Путь по которому прошли зомби
        var n=0;
        var self=this;

        // Просчитываем пути зомби
        this.zombies.forEach(function(zombie){

            // Зомби пошел, получаем информацию о его похождениях - все шаги, последний шаг
            result = self.stepService.walk(zombie);
            zombie.x = result.lastStep[0];
            zombie.y = result.lastStep[1]; 
            console.log('zombie '+zombie.id+' moved to ('+zombie.x+','+zombie.y+')');

            // Собираем дорожки по которым прошли зомби, не повезло оказаться на них
            zombiPath.push({
                zombie: zombie,
                steps: result.steps
            });
            n++;
        });

        // Ищем жертв зомби и заражаем
        zombiPath.forEach(function(path){

            // ищем жертв
            var victims = self.creatures.filter(function(creature){
                for(var step of path.steps) {   
                    // Все кто оказались на пути                 
                    if (step[0] == creature.x && step[1] == creature.y) {
                        return true;
                    }
                }
                return false;
            });

             // Заражаем
            for(var creature of victims) {          
                // Новый зомби      
                var newZombie = self.bloodService.infect(creature, path.zombie);
                // Добавляем его в систему
                self.place([newZombie]);
                console.log('zombie '+path.zombie.id+' infected creature at ('+creature.x+', '+creature.y+')');
                // уменьшаем число существ, оставляем только живых
                self.creatures = self.creatures.filter( el => el.id !== creature.id ); 
            }

        });

          

           

    }


}

module.exports = Lostland;