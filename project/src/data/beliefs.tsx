import React from 'react';
import { Dribbble as Bible, Cross, Sun, Droplets, Heart, Clock, CalendarDays, Guitar as Hospital, ChurchIcon, Leaf, Scale, Sparkles } from 'lucide-react';
import { BeliefProps } from '../components/BeliefsCard';

export const coreBeliefs: BeliefProps[] = [
  {
    id: 'belief1',
    title: 'The Holy Scriptures',
    summary: 'The Bible is God\'s inspired Word and the standard of faith and practice.',
    scriptureRef: '2 Timothy 3:16-17',
    description: 'The Holy Scriptures, both Old and New Testaments, are the written Word of God, given by divine inspiration. The inspired authors spoke and wrote as they were moved by the Holy Spirit. The Scriptures are the infallible revelation of God\'s will, the authoritative revealer of doctrines, and the trustworthy record of God\'s acts in history.',
    icon: <Bible size={24} />
  },
  {
    id: 'belief2',
    title: 'The Trinity',
    summary: 'God is One in three co-eternal Persons—Father, Son, and Holy Spirit.',
    scriptureRef: 'Matthew 28:19; 2 Corinthians 13:14',
    description: 'There is one God: Father, Son, and Holy Spirit, a unity of three co-eternal Persons. God is immortal, all-powerful, all-knowing, above all, and ever present. He is infinite and beyond human comprehension, yet known through His self-revelation. God is forever worthy of worship, adoration, and service by the whole creation.',
    icon: <Sparkles size={24} />
  },
  {
    id: 'belief3',
    title: 'Salvation',
    summary: 'Salvation is through faith in Christ alone, who died as our substitute.',
    scriptureRef: 'John 3:16; Ephesians 2:8-10',
    description: 'In Christ\'s life of perfect obedience, His suffering, death, and resurrection, God provided the only means of atonement for human sin, so that those who by faith accept this atonement may have eternal life. Salvation is all of grace, through faith alone, and not of works, yet is manifested in obedience to God\'s commandments.',
    icon: <Cross size={24} />
  },
  {
    id: 'belief4',
    title: 'The Sabbath',
    summary: 'The seventh-day Sabbath is God\'s perpetual sign of His covenant relationship.',
    scriptureRef: 'Exodus 20:8-11; Isaiah 56:5-6',
    description: 'The seventh day of the week is the Sabbath, a day of rest and worship instituted at Creation and affirmed in the Ten Commandments. It is observed from sunset Friday to sunset Saturday as a joyful celebration of God\'s creative and redemptive acts.',
    icon: <Sun size={24} />
  },
  {
    id: 'belief5',
    title: 'Baptism',
    summary: 'Baptism by immersion symbolizes death to sin and new birth in Christ.',
    scriptureRef: 'Romans 6:1-6; Colossians 2:12-13',
    description: 'By baptism, we confess our faith in the death and resurrection of Jesus Christ, and testify of our death to sin and of our purpose to walk in newness of life. Baptism is a symbol of our union with Christ, the forgiveness of our sins, and our reception of the Holy Spirit.',
    icon: <Droplets size={24} />
  },
  {
    id: 'belief6',
    title: 'The Second Coming',
    summary: 'Jesus will return visibly and gloriously to resurrect the righteous and take them to heaven.',
    scriptureRef: '1 Thessalonians 4:16-17; Revelation 1:7',
    description: 'The second coming of Christ is the blessed hope of the church, the grand climax of the gospel. The Saviour\'s coming will be literal, personal, visible, and worldwide. When He returns, the righteous dead will be resurrected, and together with the righteous living will be glorified and taken to heaven.',
    icon: <Sparkles size={24} />
  },
  {
    id: 'belief7',
    title: 'Christian Behavior',
    summary: 'Christians should live godly lives that reflect the character of Jesus.',
    scriptureRef: '1 Peter 1:15-16; Philippians 4:8',
    description: 'We are called to be a godly people who think, feel, and act in harmony with biblical principles in all aspects of personal and social life. We are to develop purity of thought and action, abstaining from all practices harmful to the body and mind.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief8',
    title: 'State of the Dead',
    summary: 'Death is an unconscious state until the resurrection when Christ returns.',
    scriptureRef: 'Ecclesiastes 9:5-6; 1 Thessalonians 4:13-17',
    description: 'The wages of sin is death. But God, who alone is immortal, will grant eternal life to His redeemed. Until that day, death is an unconscious state for all people. When Christ returns, He will resurrect the righteous dead and take them to heaven.',
    icon: <Clock size={24} />
  },
  {
    id: 'belief9',
    title: 'The Church',
    summary: 'The church is the community of believers who confess Jesus Christ as Lord and Savior.',
    scriptureRef: 'Ephesians 4:11-15; 1 Peter 2:9',
    description: 'The church is the community of believers who confess Jesus Christ as Lord and Savior. We join together for worship, fellowship, instruction in the Word, celebration of the Lord\'s Supper, service to humanity, and worldwide proclamation of the gospel.',
    icon: <ChurchIcon size={24} />
  },
  {
    id: 'belief10',
    title: 'Health & Lifestyle',
    summary: 'We honor God by caring for our bodies through healthful living.',
    scriptureRef: '1 Corinthians 6:19-20; 3 John 1:2',
    description: 'Because our bodies are the temples of the Holy Spirit, we are to care for them intelligently. Along with adequate exercise and rest, we are to adopt the most healthful diet possible and abstain from unclean foods identified in the Scriptures.',
    icon: <Hospital size={24} />
  },
  {
    id: 'belief11',
    title: 'Creation',
    summary: 'God created the world in six literal days and established the seventh-day Sabbath.',
    scriptureRef: 'Genesis 1-2; Exodus 20:8-11',
    description: 'God is the Creator of all things, and has revealed in Scripture the authentic and historical account of His creative activity. In six literal days the Lord made "the heavens and the earth" and all living things, and rested on the seventh day of that first week.',
    icon: <Leaf size={24} />
  },
  {
    id: 'belief12',
    title: 'The Judgment',
    summary: 'There is an investigative judgment before Christ returns.',
    scriptureRef: 'Daniel 7:9-10; Revelation 14:6-7',
    description: 'There is a sanctuary in heaven, the true tabernacle that the Lord set up and not humans. In it Christ ministers on our behalf. He was inaugurated as our great High Priest and began His intercessory ministry at the time of His ascension.',
    icon: <Scale size={24} />
  },
  {
    id: 'belief13',
    title: 'The Remnant and Its Mission',
    summary: 'The universal church is composed of all who truly believe in Christ.',
    scriptureRef: 'Revelation 12:17; 19:10',
    description: 'The universal church is composed of all who truly believe in Christ, but in the last days, a time of widespread apostasy, a remnant has been called out to keep the commandments of God and the faith of Jesus.',
    icon: <ChurchIcon size={24} />
  },
  {
    id: 'belief14',
    title: 'Unity in the Body of Christ',
    summary: 'The church is one body with many members, called from every nation.',
    scriptureRef: '1 Corinthians 12:12-14; Ephesians 4:3-6',
    description: 'The church is one body with many members, called from every nation, kindred, tongue, and people. In Christ we are a new creation; distinctions of race, culture, learning, and nationality cease to be divisive.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief15',
    title: 'Baptism',
    summary: 'By baptism we confess our faith in the death and resurrection of Jesus Christ.',
    scriptureRef: 'Romans 6:1-6; Colossians 2:12-13',
    description: 'By baptism we confess our faith in the death and resurrection of Jesus Christ, and testify of our death to sin and of our purpose to walk in newness of life. Baptism is a symbol of our union with Christ.',
    icon: <Droplets size={24} />
  },
  {
    id: 'belief16',
    title: 'The Lord\'s Supper',
    summary: 'The Lord\'s Supper is a participation in the emblems of the body and blood of Jesus.',
    scriptureRef: '1 Corinthians 10:16-17; 11:23-30',
    description: 'The Lord\'s Supper is a participation in the emblems of the body and blood of Jesus as an expression of faith in Him, our Lord and Saviour. The communion service is open to all believing Christians.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief17',
    title: 'Spiritual Gifts and Ministries',
    summary: 'God bestows upon all members of His church spiritual gifts for ministry.',
    scriptureRef: '1 Corinthians 12:1-11; Ephesians 4:8-16',
    description: 'God bestows upon all members of His church in every age spiritual gifts which each member is to employ in loving ministry for the common good of the church and of humanity.',
    icon: <Sparkles size={24} />
  },
  {
    id: 'belief18',
    title: 'The Gift of Prophecy',
    summary: 'One of the gifts of the Holy Spirit is prophecy.',
    scriptureRef: '1 Corinthians 1:5-7; Revelation 12:17; 19:10',
    description: 'One of the gifts of the Holy Spirit is prophecy. This gift is an identifying mark of the remnant church and was manifested in the ministry of Ellen G. White.',
    icon: <Bible size={24} />
  },
  {
    id: 'belief19',
    title: 'The Law of God',
    summary: 'The great principles of God\'s law are embodied in the Ten Commandments.',
    scriptureRef: 'Exodus 20:1-17; Matthew 22:36-40',
    description: 'The great principles of God\'s law are embodied in the Ten Commandments and exemplified in the life of Christ. They express God\'s love, will, and purposes concerning human conduct and relationships.',
    icon: <Scale size={24} />
  },
  {
    id: 'belief20',
    title: 'The Sabbath',
    summary: 'The beneficent Creator rested on the seventh day and instituted the Sabbath.',
    scriptureRef: 'Genesis 2:1-3; Exodus 20:8-11; Isaiah 56:5-6',
    description: 'The beneficent Creator, after the six days of Creation, rested on the seventh day and instituted the Sabbath for all people as a memorial of Creation. The fourth commandment requires the observance of this seventh-day Sabbath.',
    icon: <Sun size={24} />
  },
  {
    id: 'belief21',
    title: 'Stewardship',
    summary: 'We are God\'s stewards, entrusted by Him with time and opportunities.',
    scriptureRef: '1 Chronicles 29:14; Haggai 1:3-11; Malachi 3:8-12',
    description: 'We are God\'s stewards, entrusted by Him with time and opportunities, abilities and possessions, and the blessings of the earth and its resources. We acknowledge God\'s ownership by faithful service and by returning tithes and giving offerings.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief22',
    title: 'Christian Behavior',
    summary: 'We are called to be a godly people who think, feel, and act in harmony with biblical principles.',
    scriptureRef: '1 John 2:6; Ephesians 5:1-21; Philippians 4:8',
    description: 'We are called to be a godly people who think, feel, and act in harmony with biblical principles in all aspects of personal and social life. For the Spirit to recreate in us the character of our Lord we involve ourselves only in those things that will produce Christlike purity, health, and joy.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief23',
    title: 'Marriage and the Family',
    summary: 'Marriage was divinely established in Eden and affirmed by Jesus.',
    scriptureRef: 'Genesis 2:18-25; Matthew 19:3-9; Ephesians 5:21-33',
    description: 'Marriage was divinely established in Eden and affirmed by Jesus to be a lifelong union between a man and a woman in loving companionship. For the Christian a marriage commitment is to God as well as to the spouse.',
    icon: <Heart size={24} />
  },
  {
    id: 'belief24',
    title: 'Christ\'s Ministry in the Heavenly Sanctuary',
    summary: 'There is a sanctuary in heaven where Christ ministers on our behalf.',
    scriptureRef: 'Hebrews 8:1-5; 4:14-16; 10:19-22',
    description: 'There is a sanctuary in heaven, the true tabernacle that the Lord pitched and not humans. In it Christ ministers on our behalf, making available to believers the benefits of His atoning sacrifice offered once for all on the cross.',
    icon: <ChurchIcon size={24} />
  },
  {
    id: 'belief25',
    title: 'The Second Coming of Christ',
    summary: 'The second coming of Christ is the blessed hope of the church.',
    scriptureRef: 'Titus 2:13; Hebrews 9:28; John 14:1-3',
    description: 'The second coming of Christ is the blessed hope of the church, the grand climax of the gospel. The Saviour\'s coming will be literal, personal, visible, and worldwide. When He returns, the righteous dead will be resurrected.',
    icon: <Sparkles size={24} />
  },
  {
    id: 'belief26',
    title: 'Death and Resurrection',
    summary: 'The wages of sin is death, but God will grant eternal life to His redeemed.',
    scriptureRef: 'Romans 6:23; 1 Corinthians 15:51-54; 1 Thessalonians 4:13-17',
    description: 'The wages of sin is death. But God, who alone is immortal, will grant eternal life to His redeemed. Until that day death is an unconscious state for all people. When Christ returns, the righteous dead will be resurrected.',
    icon: <Clock size={24} />
  },
  {
    id: 'belief27',
    title: 'The Millennium and the End of Sin',
    summary: 'The millennium is the thousand-year reign of Christ with His saints in heaven.',
    scriptureRef: 'Revelation 20; 1 Corinthians 6:2-3; Jeremiah 4:23-26',
    description: 'The millennium is the thousand-year reign of Christ with His saints in heaven between the first and second resurrections. During this time the wicked dead will be judged; the earth will be utterly desolate.',
    icon: <Scale size={24} />
  },
  {
    id: 'belief28',
    title: 'The New Earth',
    summary: 'On the New Earth, in which righteousness dwells, God will provide an eternal home.',
    scriptureRef: '2 Peter 3:13; Isaiah 35; 65:17-25; Revelation 21:1-5',
    description: 'On the New Earth, in which righteousness dwells, God will provide an eternal home for the redeemed and a perfect environment for everlasting life, love, joy, and learning in His presence.',
    icon: <Leaf size={24} />
  }
];