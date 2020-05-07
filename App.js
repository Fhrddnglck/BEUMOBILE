/* BEU MOBILE APP NATIVE*/
import React from 'react'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { Dimensions } from 'react-native'

import YemekListesi from './components/YemekListesiComponent/YemekListesi'
import Duyurular from './components/DuyurularComponent/Duyurular'
import AkademikTakvim from './components/AkademikTakvimComponent/AkademikTakvim'
import TelefonRehberi from './components/TelefonRehberiComponent/TelefonRehberi'
import Anasayfa from './components/AnasayfaComponent/Anasayfa'
import EtkinlikTakvimi from './components/EtkinlikTakvimiComponent/EtkinlikTakvimi'
import Rimer from './components/RimerComponents/Rimer'
import Eposta from './components/EpostaComponent/Eposta'
import PersonelAra from './components/PersonelAraComponent/PersonelAra'
import ebys from './components/EBYSComponents/ebys'
import AkilliKart from './components/AkilliKartComponent/AkilliKart'
import Haberler from './components/HaberlerComponent/Haberler'
import CustomComponent from './CustomDrawer/CustomDrawerComponent'
import Uzem from './components/UzemComponent/Uzem'

const DrawerNavigator = createDrawerNavigator({
    Anasayfa,
    YemekListesi,
    Duyurular,
    AkademikTakvim,
    TelefonRehberi,
    EtkinlikTakvimi,
    Rimer,
    Eposta,
    PersonelAra,
    ebys,
    AkilliKart,
    Haberler,
    Uzem
},{contentComponent:props=><CustomComponent {...props}/>}
)
export default createAppContainer(DrawerNavigator)