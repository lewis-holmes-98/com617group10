import React from "react";
// import '../styles/main.css';

function Home() {
    return (
        <div className="container mx-auto pt-6">
            <div>
                <p className='text-gray-600'>Welcome</p>
            </div>
            <div>
                <p className="pt-5 text-gray-600">What makes good snow for skiing and snowboarding?</p>
                <p className="text-justify pt-2 text-gray-600">There are several classifications of snowfall that persons conducting snowsports should be aware of.
                    One of the major parts of becoming a more proficient skier is the ability to handle a variety of
                    conditions as the experience can be altered by the level of snowfall. We will cover some of the most common snow conditions.
                </p>
            </div>
            <div>
                <h3 className="pt-5 text-gray-600 ">Fresh Snow</h3>
                <p className="text-justify pt-2 text-gray-600 ">Fresh snow is a favourite among most skiers at any skill level. Heavier amounts of fresh snow overnight increase the grip that the skier experiences when taking turns, they allow a smoother ride and give cushioning if the skier takes a fall.
                    Because of the popularity, most skiers take advantage of the fresh snow early in the morning, giving the best experience.
                    The system should consider this type of snow the best for most skiers.
                </p>
            </div>
            <div>
                <h3 className="pt-5 text-gray-600">Powder</h3>
                <p className="text-justify pt-2 text-gray-600">Powder occurs when the resort experiences heavy snowfall over days and the fine grains of snow can give the skier a feeling of floating over the snow. Slopes often manipulate the snow using machinery in a process called Grooming. Because of this, it is unlikely that skiers come across much Powder snow on the main slopes.
                    The system should consider this type of snow second best for most skiers.
                </p>
                <div>
                    <h3 className="pt-5 text-gray-600">Packed Powder</h3>
                    <p className="text-justify pt-2 text-gray-600">Packed powder is compressed powder often by the Piste Basher (a piece of slope machinery) over a short period of time. It provides an even surface that allows novice skiers to learn and practice their techniques because it does not have any unexpected bumps.
                        The system should consider this type of snow as the best for learners.
                    </p>
                </div>
                <div>
                    <h3 className="pt-5 text-gray-600">Icy, Hard-Packed Pistes</h3>
                    <p className="text-justify pt-2 text-gray-600">Icy, Hard-packed pistes are formed over time as the moisture content of the snow increases as well as being compacted by skiers and grooming machinery over time. For skiers, this type of surface is very challenging and for most people, they should avoid this. However, because of the surface, skiers can experience the greatest speeds when skiing on this surface.
                        The system should not consider this type of snow suitable.
                    </p>
                </div>
                <div>
                    <h3 className="pt-5 text-gray-600">Slush</h3>
                    <p className="text-justify pt-2 text-gray-600">
                        Slush arrives in warmer weather in spring. It is not a prefered snow condition.
                        The system should not consider this type of snow as preferred.
                    </p>
                </div>
                <div>
                    <h3 className="pt-5 text-gray-600">CRUD Snow</h3>
                    <p className="text-justify pt-2 text-gray-600">Crud snow is among the worst snow types, it is the by-product of skiers skiing on un-groomed powder. It is challenging because of the changing consistency of the snow surface.
                        The system will not consider this type of snow.</p>
                </div>
                <div className="container mx-auto pt-5 pb-4 ">
                    <iframe width="788" height="443" src="https://www.youtube.com/embed/wDhxhzWre6I" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}


export default Home