import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name: 'Lucas Pauletti',
            email: 'lucasdiavolo2020@gmail.com',
            avatarUrl: 'https://github.com/Degurechaffer.png',
        }
    })

    const pool = await prisma.pool.create({
       data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

        participants:{
            create:{
                UserId: user.id
            }
        }
       } 
    })
    await prisma.game.create({
        data:{
            date:'2022-11-02T12:00:00.281Z',
            firstTeamCountryCode: 'DE',
            SecondTeamCountryCode: 'BR',
        }
    })
    await prisma.game.create({
        data:{
            date:'2022-11-04T12:00:00.281Z',
            firstTeamCountryCode: 'BR',
            SecondTeamCountryCode: 'AR',
        
        guesses:{
            create:{
                firstTeamPoints: 2,
                secondTeamPoints: 1,
            
            participant:{
                connect:{
                    UserId_poolId:{
                        UserId: user.id,
                        poolId: pool.id
                    }
                }
            }
            }
        }
        }
    })
}

main();