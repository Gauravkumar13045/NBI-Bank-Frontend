import React, { useState, useEffect, useRef } from "react";
import Logo from "../../images/logo/logo-nbi-new.png";
import rain from "../../images/rainy.png";
import qrscanner from "../../images/icons8-qr-code.gif"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import IncomeExpenseChart from "../../components/IncomeExpenseChart";
import CircularProgress from "../../components/CircularProgress";
import DounutChart from "../../components/dounutChart"
import BlackCard from "../../images/cards/blackcard.png";
import GoldenCard from "../../images/cards/goldencard.png";
import SilverCard from "../../images/cards/silvercard.png";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;







function Dashboard() {

    const [focusedField, setFocusedField] = useState("");
    const data = [{ balance: 20 }, { balance: 35 }, { balance: 25 }, { balance: 45 }, { balance: 38 }, { balance: 60 },];
    const valueRewardPercent = 14820;
    const rewardPercentage = (valueRewardPercent / 20000) * 100;

    const [showSaving, setShowSaving] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNetWorth, setShowNetWorth] = useState(false);
    const [FocusedFieldSearch, setFocusedFieldSearch] = useState("");
    const [chartInfoDisplay, setChartInfoDisplay] = useState(false);




    const [TransactionState, SetTransactionState] = useState([]);
    const [LoadingState, SetLoadingState] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {

        const fetchTransactions = async () => {

            try {

                const response = await fetch("/json/transaction.json");

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                const data = await response.json();

                SetTransactionState(data.transaction);

            } catch (err) {

                seterror(err.message);

            } finally {

                SetLoadingState(false);

            }

        };

        fetchTransactions();

    }, []);

    const [chartDialogBox, SetchartDialogBox] = useState(false);

    const [activeCard, setActivecard] = useState(0);


    const [cardInfo, setCardInfo] = useState([]);

    useEffect(() => {
        async function fetchCard() {
            const card = await fetch("/json/cardInfo.json");
            const response = await card.json();
            setCardInfo(response.Cards);
        }
        fetchCard();


    }, []);





    const cardContainerRef = useRef(null);


    const handleScroll = () => {
        const container = cardContainerRef.current;

        if (!container) return;

        const index = Math.round(
            container.scrollLeft / container.clientWidth
        );

        setActivecard(index);
    };


    const goToCard = (index) => {
        const container = cardContainerRef.current;

        if (!container) return;

        container.scrollTo({
            left: container.clientWidth * index,
            behavior: "smooth",
        });

        setActivecard(index);
    };


    const [showAddContact, setShowAddContact] = useState(false);

    const [FetchContactDetail, setFetchContactDetail] = useState([]);

    useEffect(() => {
        async function ContactDetailFetcher() {
            const fetchContact = await fetch("/json/QuickContact.json");
            const ContactDetail = await fetchContact.json();
            setFetchContactDetail(ContactDetail.QuickContact);
        }
        ContactDetailFetcher();

    }, []);


    const [upcomingPaymentDetail, setUpcomingPaymentDetail] = useState([]);

    useEffect(() => {
        async function UpcomingPayment() {

            const UpcomingPayment = await fetch("./json/UpcomingPayments.json");
            const UpcomingPaymentFetch = await UpcomingPayment.json();
            setUpcomingPaymentDetail(UpcomingPaymentFetch.Payments);
        }
        UpcomingPayment();

    }, []);


    const currencies = ["USD", "EUR", "GBP", "JPY", "CNY"];
    const countryMap = { USD: "us", EUR: "eu", GBP: "gb", JPY: "jp", CNY: "cn", };
    const [rateInfo, setRateInfo] = useState({});
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const currencyRate = async () => {
        try {
            const result = {};
            await Promise.all(
                currencies.map(async (currency) => {
                    const Ratefetcher = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=INR`);
                    const RateDisplayer = await Ratefetcher.json();
                    result[currency] = RateDisplayer.rates.INR;


                })
            );

            setRateInfo(result);
            setLastUpdated(new Date());

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        currencyRate();
        const interval = setInterval(() => {
            currencyRate();
        }, 60000);

        return () => clearInterval(interval);
    }, []);





    const [marketWatch, setMarketWatch] = useState([]);

    const markets = [
        { symbol: "^BSESN" },
        { symbol: "^NSEI" },
        { symbol: "^NSEBANK" },
        { symbol: "GC=F" }

    ];
    const [lastUpdatedtime, setLastUpdatedtime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());


    useEffect(() => {

        async function fetchMarketData(symbol) {

            try {
                const response = await fetch(`https://finansium.ai.studio/api/market-data?symbol=${encodeURIComponent(symbol)}`,
                    {
                        cache: "no-store"
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const result = await response.json();
                return result.data;

            } catch (error) {
                console.error(`Failed to fetch ${symbol}:`, error);
                return null;
            }
        }


        async function marketInfoFetcher() {

            const results = await Promise.all(
                markets.map(market => fetchMarketData(market.symbol))
            );

            console.log(results);

            setMarketWatch(results.filter(Boolean));
            setLastUpdatedtime(new Date());
        }

        marketInfoFetcher();

        const interval = setInterval(() => {
            marketInfoFetcher();
        }, 5 * 60 * 1000);

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };

    }, []);

    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const marketOpen = currentMinutes >= (9 * 60 + 30) && currentMinutes <= (15 * 60 + 30);





    function getTimeAgo(fetchedAt, currentTime) {
        if (!fetchedAt) return "—";

        const diffMs = currentTime - fetchedAt;
        const diffMin = Math.floor(diffMs / 60000);

        if (diffMin < 1) return "Just now";
        if (diffMin === 1) return "1 min ago";
        if (diffMin < 60) return `${diffMin} min ago`;

        const diffHr = Math.floor(diffMin / 60);
        if (diffHr === 1) return "1 hr ago";
        return `${diffHr} hr ago`;
    }



    const [FinanceNews, setFinanceNews] = useState([]);
    const [currentTimeNews, setCurrentTimeNews] = useState(new Date());
    const [lastFetchedAt, setLastFetchedAt] = useState(null);


    useEffect(() => {
        async function NewsFetcher(force = false) {
            console.log("🔥 NEWS FETCH CHECK:", new Date().toLocaleTimeString());

            const savedNews = localStorage.getItem("financeNews");

            if (!force && savedNews) {
                const parsedNews = JSON.parse(savedNews);
                const age = Date.now() - parsedNews.fetchedAt;

                if (age < 30 * 60 * 1000) {
                    console.log("⏭️ Using cache, skipping API call");
                    setFinanceNews(parsedNews.data);
                    setLastFetchedAt(parsedNews.fetchedAt);
                    return;
                }
            }

            try {
                const NewsGet = await fetch(
                    `https://api.marketaux.com/v1/news/all?countries=in&industries=Financial%20Services&filter_entities=true&language=en&limit=3&api_token=${NEWS_API_KEY}`
                );

                if (!NewsGet.ok) {
                    throw new Error(`HTTP Error: ${NewsGet.status}`);
                }

                const news = await NewsGet.json();
                setFinanceNews(news.data);
                const now = Date.now();
                setLastFetchedAt(now);

                localStorage.setItem(
                    "financeNews",
                    JSON.stringify({
                        data: news.data,
                        fetchedAt: Date.now()
                    })
                );
                console.log("✅ NEWS FETCH SUCCESS:", new Date().toLocaleTimeString());

            } catch (error) {
                console.error(`Failed to fetch:`, error);
            }
        }


        NewsFetcher();



        const NewsTimer = setInterval(() => {
            NewsFetcher();
        }, 30 * 60 * 1000);

        const timer = setInterval(() => {
            setCurrentTimeNews(new Date());
        }, 60000);

        return () => {
            clearInterval(NewsTimer);
            clearInterval(timer);
        };
    }, []);




    const [CreditScore, setCreditScore] = useState(765);
    const [ScoreChange, setScoreChange] = useState(24);
    const [ScoreUpdatedDaysAgo, setScoreUpdatedDaysAgo] = useState(2);
    const clampedScore = Math.min(900, Math.max(300, CreditScore));

    const ScoreFactors = [
        { label: "Payment History", value: 92 },
        { label: "Credit Utilization", value: 24 },
        { label: "Credit Age", value: 68 },
        { label: "Credit Mix", value: 55 },
    ];

    function getScoreLabel(score) {
        if (score >= 750) return "Excellent";
        if (score >= 700) return "Good";
        if (score >= 650) return "Fair";
        return "Poor";
    }











    return (

        <div className="h-screen bg-black flex">

            {showAddContact && (
                <div className=" w-full bg-black/60  absolute min-h-screen z-9999  flex items-center justify-center p-4  font-sans text-white">

                    <div className="w-full max-w-160 bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 sm:p-8 shadow-2xl">


                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-[#e5af3f] flex items-center justify-center text-[#e5af3f] shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <line x1="19" y1="8" x2="19" y2="14"></line>
                                        <line x1="22" y1="11" x2="16" y2="11"></line>
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Add New Contact</h2>
                                    <p className="text-sm text-[#888888]">Add a new beneficiary for quick transfers</p>
                                </div>
                            </div>
                            <button className="text-[#e5af3f] hover:opacity-80 transition-opacity p-1 cursor-pointer" onClick={() => setShowAddContact(false)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>


                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                                <div className="flex flex-col gap-2">
                                    <label className="text-[#e5af3f] text-[13px] font-medium">Name</label>
                                    <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 focus-within:border-[#e5af3f] transition-colors">
                                        <div className="text-[#e5af3f] mr-3">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Enter full name"
                                            className="w-full bg-transparent border-none text-white text-sm py-4 outline-none placeholder-[#555555]"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-2">
                                    <label className="text-[#e5af3f] text-[13px] font-medium">Mobile Number</label>
                                    <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 focus-within:border-[#e5af3f] transition-colors">
                                        <div className="text-[#e5af3f] mr-3">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            required
                                            type="Number"
                                            placeholder="Enter mobile number"
                                            className="w-full bg-transparent border-none text-white text-sm py-4 outline-none placeholder-[#555555]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-col-1 xl:grid-cols-2 xl:gap-5 ">

                                <div className="flex flex-col gap-2 mb-6">
                                    <label className="text-[#e5af3f] text-[13px] font-medium">Account Number (Optional)</label>
                                    <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 focus-within:border-[#e5af3f] transition-colors">
                                        <div className="text-[#e5af3f] mr-3">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                <line x1="1" y1="10" x2="23" y2="10"></line>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter account number"
                                            className="w-full bg-transparent border-none text-white text-sm py-4 outline-none placeholder-[#555555]"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-2 mb-6">
                                    <label className="text-[#e5af3f] text-[13px] font-medium">Bank</label>
                                    <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 focus-within:border-[#e5af3f] transition-colors">
                                        <div className="text-[#e5af3f] mr-3">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                                                <path d="M3 21h18"></path>
                                                <path d="M3 10h18"></path>
                                                <path d="M5 6l7-3 7 3"></path>
                                                <path d="M4 10v11"></path>
                                                <path d="M20 10v11"></path>
                                                <path d="M8 14v3"></path>
                                                <path d="M12 14v3"></path>
                                                <path d="M16 14v3"></path>
                                            </svg>
                                        </div>
                                        <select required className="w-full  bg-transparent border-none text-[#555555] text-sm py-4 outline-none appearance-none cursor-pointer">
                                            <option value="" defaultChecked className="bg-[#d8b45c] text-black ">Select your bank</option>
                                            <option value="1" className="text-[#d8b45c] bg-black hover:text-black hover:bg-[#d8b45c] ">SBI-State Bank of India</option>
                                            <option value="2" className="text-[#d8b45c] bg-black">PNB-Punjab National Bank</option>
                                            <option value="3" className="text-[#d8b45c] bg-black">NBI-National Bank of India</option>
                                            <option value="4" className="text-[#d8b45c] bg-black">BOI-Bank of India</option>
                                            <option value="5" className="text-[#d8b45c] bg-black">Indian Bank</option>




                                        </select>
                                        <div className="absolute right-4 text-[#e5af3f] pointer-events-none">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mb-8">
                                <label className="text-[#e5af3f] text-[13px] font-medium">Nickname (Optional)</label>
                                <div className="relative flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 focus-within:border-[#e5af3f] transition-colors">
                                    <div className="text-[#e5af3f] mr-3">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Home, Office, Family"
                                        className="w-full bg-transparent border-none text-white text-sm py-4 outline-none placeholder-[#555555]"
                                    />
                                </div>
                            </div>


                            <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-4 flex items-center gap-4 mb-8">
                                <div className="text-[#e5af3f] shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        <polyline points="9 12 11 14 15 10"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[#e5af3f] text-sm font-medium mb-1">Secure & Trusted</h4>
                                    <p className="text-[13px] text-[#888888]">All transactions are protected with bank-level security</p>
                                </div>
                            </div>


                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    className="flex-1 py-4 px-6 rounded-lg font-semibold cursor-pointer text-[15px] text-white border border-[#e5af3f] bg-transparent hover:bg-white/5 transition-colors"
                                    onClick={() => setShowAddContact(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 cursor-pointer py-4 px-6 rounded-lg font-semibold text-[15px] text-black border border-[#e5af3f] bg-[#e5af3f] hover:bg-[#d4a035] transition-colors"
                                >
                                    Add Contact
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}


            <aside className=" border-r border-white/10 hidden md:flex flex-col bg-black lg:w-60 w-30">


                <div className="flex justify-center pt-6">
                    <img
                        src={Logo}
                        alt="NBI - National Bank of India"
                        className="lg:w-40 w-20 object-contain cursor-pointer"
                    />
                </div>


                <div className="flex-1 flex flex-col justify-center px-4 space-y-3">

                    <div className="flex items-center gap-3 px-4 py-3   rounded-xl bg-[#d8b45c]/10 border-l-2 border-[#d8b45c] shadow-[0_0_25px_rgba(216,180,92,0.15)] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> </svg>
                        <p className="text-white hidden lg:flex  font-medium text-md">Dashboard</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 21l18 0" /> <path d="M3 10l18 0" /> <path d="M5 6l7 -3l7 3" /> <path d="M4 10l0 11" /> <path d="M20 10l0 11" /> <path d="M8 14l0 3" /> <path d="M12 14l0 3" /> <path d="M16 14l0 3" /></svg>
                        <p className="text-white  hidden lg:flex  font-medium text-md">Banking</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /> <path d="M3 10h18" /> <path d="M16 19h6" /> <path d="M19 16l3 3l-3 3" /> <path d="M7.005 15h.005" /> <path d="M11 15h2" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Payments</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-moneybag-heart w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5" /> <path d="M11.5 21h-3.5a4 4 0 0 1 -4 -4v-1a8 8 0 0 1 14.376 -4.833" /> <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.24 2.24 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.24 2.24 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Wealth</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Account</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock-square-rounded w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" /> <path d="M8 12a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -3" /> <path d="M10 11v-2a2 2 0 1 1 4 0v2" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Security</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                        <p className="text-white  hidden lg:flex  text-md font-medium">Settings</p>
                    </div>


                </div>

                <div className="flex items-center justify-center gap-3   py-3 rounded-xl cursor-pointer hover:bg-red-500/10 transition-all duration-300">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout w-7  cursor-pointer text-red-500 ">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                    </svg>

                    <p className="text-red-500 text-sm font-medium  hidden lg:flex ">
                        Logout
                    </p>

                </div>

            </aside>





            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 w-full h-20 bg-black border-t border-white/10 md:hidden flex items-center justify-around z-50">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" /> <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" /> </svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 21l18 0" /> <path d="M3 10l18 0" /> <path d="M5 6l7 -3l7 3" /> <path d="M4 10l0 11" /> <path d="M20 10l0 11" /> <path d="M8 14l0 3" /> <path d="M12 14l0 3" /> <path d="M16 14l0 3" /></svg>

                <div className="cursor-pointer border-2  border-white bg-[#FFFFFF] rounded-full p-2 hover:scale-108 transition-all duration-200 hover:border-[#d8b45c] hover:border-2">
                    <img src={qrscanner} className="w-10" />
                </div>


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /> <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings w-7 text-[#d8b45c] cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>


            </nav>




            {/* Main Area */}
            <div className="flex-1 flex flex-col">




                {/* Header */}
                <header className=" border-b border-white/10 grid grid-cols-[1.5fr_0fr_0fr] md:grid-cols-[1.5fr_0fr_1.5fr] lg:grid-cols-[1fr_1fr_2fr] p-3">

                    <div className="flex items-center md:hidden">
                        <img
                            src={Logo}
                            alt="NBI - National Bank of India"
                            className=" w-30  mt-2 ml-2 object-contain cursor-pointer"
                        />
                    </div>
                    <div className="mt-2 ml-6  hidden md:block">
                        <p className="text-white text-sm leading-tight font-normal hidden md:block">Dashboard</p>
                        <p className="text-white md:text-xl text-lg " style={{ fontFamily: "Playfair Display" }}>Welcome Back, <span className="text-[#d8b45c] ">Gaurav</span></p>






                    </div>


                    <div className="flex items-center justify-center w-full max-w-sm mx-auto">
                        <div className="relative w-full">

                            <span className="absolute inset-y-0 left-3 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-5 transition-colors duration-300 hidden lg:block cursor-pointer ${focusedField === "search"
                                        ? "text-[#d8b45c]"
                                        : "text-gray-400"
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </span>


                            <input
                                type="search"
                                placeholder="Search transactions, beneficiaries, cards..."
                                onFocus={() => setFocusedField("search")}
                                onBlur={() => setFocusedField("")}
                                className=" hidden lg:block w-full border border-white/40 rounded-full text-white text-sm pl-10 pr-4 py-2.5 bg-black/20 placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_15px_rgba(216,180,92,0.2)] cursor-pointer hover:border-[#d8b45c]/40 hover:shadow-[0_0_20px_rgba(216,180,92,0.15)]"
                            />

                        </div>
                    </div>



                    <div className=" flex items-center justify-center  ">

                        <div className="gap-4 md:gap-6  flex border-r-[0.1px] md:border-r-gray-700 pl-5 pr-5">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search text-gray-100 w-6 hover:text-[#d8b45c] block lg:hidden cursor-pointer">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>

                            <div className="flex flex-col items-center justify-center cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bell text-gray-100 w-6 group-hover:text-[#d8b45c] "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /> <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                                <p className="text-gray-400 text-xs mt-0.5 group-hover:text-[#d8b45c] hidden lg:block">Notifications</p>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-menu-2 text-gray-100 w-6 hover:text-[#d8b45c] block lg:hidden">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>

                            <div className=" flex-col items-center justify-center group cursor-pointer hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail text-gray-100 w-6 group-hover:text-[#d8b45c] " > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /> <path d="M3 7l9 6l9 -6" /></svg>
                                <p className="text-gray-400 text-xs group-hover:text-[#d8b45c] hidden lg:block">Messages</p>

                            </div>

                            <div className=" flex-col items-center justify-center group cursor-pointer hidden md:flex">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-headset text-gray-100 w-6 group-hover:text-[#d8b45c] "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 14v-3a8 8 0 1 1 16 0v3" /> <path d="M18 19c0 1.657 -2.686 3 -6 3" /> <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /> <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3" /></svg>
                                <p className="text-gray-400 text-xs group-hover:text-[#d8b45c] hidden lg:block">Support</p>

                            </div>
                        </div>

                        <div className=" items-center hidden md:flex ">
                            <img
                                src={rain}
                                alt="Profile"
                                className="w-14 h-14  object-cover rounded-full border-2 border-[#d8b45c] ml-5"
                            />
                            <div className="ml-3  flex-col justify-center lg:block hidden ">
                                <p className=" text-white text-sm font-semibold ml-1 lg:block hidden">Gaurav Kumar</p>
                                <div className="inline-flex items-center border cursor-pointer hover:shadow-[0_0_15px_rgba(216,180,92,0.3)] border-[#d8b45c] rounded-full px-1.5 py-0.5 mt-2  text-xs w-max"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-crown text-[#d8b45c] w-5 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" /> </svg>
                                    <p className="text-[#d8b45c] ml-1 text-[10px] ">NBI Premium Client</p>
                                </div>


                            </div>


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-5 h-5  cursor-pointer hidden md:flex ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>


                        </div>

                    </div>


                </header>





                <main className="flex-1 overflow-y-auto p-5 scrollbar-none">
                    <div className="mt-3 border border-[#494133] w-full p-5 rounded-lg backdrop-blur-md bg-white/5 md:text-left text-center">
                        <p className="text-[#d8b45c] text-xs font-semibold">ACCOUNTS OVERVIEW </p>

                        <div className="sm:grid flex w-full  md:grid-cols-2 xl:grid-cols-4  gap-5 p-5">
                            {/* <div className="md:grid flex flex-cols-1 md:grid-cols-2 md:xl:grid-cols-4 md:gap-5 md:p-5 h-25 md:h-max md:overflow-none"> */}

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Saving Account</p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 5678 9012</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium "><span>₹&nbsp;</span><span className={`${showSaving ? "inline-block align-top" : "inline-flex align-middle"}`}>{showSaving ? "56,23,252" : "********"}</span></p>


                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowSaving(!showSaving) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showSaving ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowSaving(!showSaving) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showSaving ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 25 }}>
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Current Account</p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 6549 5187</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium "><span>₹&nbsp;</span><span className={`${showCurrent ? "inline-block align-top" : "inline-flex align-middle"}`}>{showCurrent ? "12,98,223" : "********"}</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowCurrent(!showCurrent) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showCurrent ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowCurrent(!showCurrent) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showCurrent ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer >
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 10,
                                                left: 0,
                                                bottom: 25
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium"> Reward Points</p>


                                    <p className="text-white text-sm font-medium mt-1"><span>{valueRewardPercent}</span> / <span className="text-[#d8b45c]">20,000</span><span className="text-[#d8b45c] text-xs"> Pts</span></p>
                                    <button
                                        disabled={valueRewardPercent < 20000}
                                        className={`w-full p-2 mt-5 rounded-full text-xs font-medium border transition-all
                                               ${valueRewardPercent >= 20000
                                                ? "text-green-500 border-green-900 bg-[#0E1A12] hover:bg-[#0b180f] cursor-pointer hover:scale-102"
                                                : "text-gray-500 border-gray-700 bg-[#111111] cursor-not-allowed opacity-60"
                                            }`}
                                    >
                                        Redeem Now
                                    </button>
                                </div>
                                <div className=" h-full ml-auto hidden min-[400px]:block">

                                    <CircularProgress
                                        percentage={rewardPercentage}
                                        size={100}
                                        strokeWidth={10}
                                    />






                                </div>



                            </div>

                            <div className="border border-[#494133] p-3 rounded-lg flex justify-between items-start">
                                <div className="text-center min-[400px]:text-left w-full min-[400px]:w-fit">
                                    <p className="text-[#d8b45c] text-sm font-medium">Total Net Worth </p>
                                    <p className="text-[#d8b45c] text-xs">XXXX 5678 9012</p><br></br>

                                    <p className="text-white text-xs">Available Balance</p>
                                    <p className="text-white text-lg font-medium"><span >₹&nbsp;</span><span className={`${showNetWorth ? "inline-block align-top" : "inline-flex align-middle"}`}>{showNetWorth ? "69,21,475" : "********"}</span></p>

                                </div>
                                <div className="w-32 h-full ml-auto hidden min-[400px]:block ">
                                    <div className="flex justify-end items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNetWorth(!showNetWorth) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye w-5 text-[#d8b45c] cursor-pointer ${showNetWorth ? "block" : "hidden"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShowNetWorth(!showNetWorth) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon icon-tabler icons-tabler-outline icon-tabler-eye-off  w-5 text-[#d8b45c] cursor-pointer ${showNetWorth ? "hidden" : "block"}`}>
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                                            <path d="M3 3l18 18" />
                                        </svg>

                                        <p className="text-green-500  rounded-full  pl-2 pr-2 font-medium bg-[#0E1A12] m-1 text-sm float-right">Active</p>

                                    </div>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={data}
                                            margin={{
                                                top: 20,
                                                right: 10,
                                                left: 0,
                                                bottom: 25
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#d8b45c" stopOpacity={0.35} />
                                                    <stop offset="100%" stopColor="#d8b45c" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            <Area
                                                type="natural"
                                                dataKey="balance"
                                                stroke="#E2D17F"
                                                strokeWidth={2}
                                                fill="url(#goldGradient)"

                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>



                            </div>
                        </div>
                    </div>
                    <div className="mt-3 border border-[#494133] w-full p-5 md:pr-10 rounded-lg backdrop-blur-md bg-white/5">
                        <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] p-2 gap-5  ">
                            <div className="border border-[#494133] p-3 rounded-lg  ">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-[#d8b45c] font-medium text-lg">Recent Transactions</p>
                                    <div className="flex gap-2 group">
                                        <button className="text-[#d8b45c] font-medium text-sm group-hover:cursor-pointer group-hover:text-[#fcd36c] group-hover:scale-105 group-transition-all group-duration-300">View All</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right w-5 text-[#d8b45c] group-hover:cursor-pointer group-hover:text-[#fcd36c] group-hover:scale-105 group-transition-all group-duration-300" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 12l14 0" /> <path d="M13 18l6 -6" /> <path d="M13 6l6 6" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical w-5 text-[#d8b45c] ml-4 "> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                    </div>


                                </div>
                                <div className="flex justify-between w-full items-center gap-2 mt-3">

                                    <div className="hidden sm:flex gap-2">
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">All</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">Credit</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">Debit</button>
                                        <button className="text-white border rounded-lg pr-3 text-center pl-3 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold transition-all duration-300 cursor-pointer">UPI</button>
                                    </div>


                                    <div className="relative  group hidden sm:flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search w-5 text-gray-500 group-focus-within:text-[#d8b45c] absolute mt-2 ml-2 ">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                            <path d="M21 21l-6 -6" />
                                        </svg>
                                        <input type="search" onFocus={() => setFocusedFieldSearch("search")} onBlur={() => setFocusedFieldSearch("")} className="border border-[#494133] w-full p-1 pl-10 text-white placeholder:text-gray-500 placeholder:text-sm rounded-xl hover:shadow-[0_0_10px_rgba(216,180,92,0.2)] transition-all duration-300 active:border-[#d8b45c] focus:outline-none focus:border-[#d8b45c] focus:shadow-[0_0_7px_rgba(216,180,92,0.2)]" placeholder="Search transactions..."></input>

                                    </div>

                                    <div className="flex sm:hidden mr-auto gap-3  ">

                                        <div className="flex items-center border border-[#494133] bg-transparent text-sm rounded-lg hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-filter  w-5 text-[#d8b45c] flex sm:hidden mx-auto relative pl-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" /></svg>
                                            <button className="text-white  rounded-lg pr-3 text-center pl-1 p-2 border-[#494133] bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">Filter</button>
                                        </div>

                                        <div className="flex items-center border border-[#494133] bg-transparent text-sm rounded-lg hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search w-5 group-focus-within:text-[#d8b45c] flex sm:hidden text-[#d8b45c] relative pl-1"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                                            <button className="text-white  rounded-lg pr-3 text-center pl-1 p-2  bg-transparent text-sm hover:text-[#D8B45C] hover:border-[#d8b45c] font-semibold  transition-all duration-300 cursor-pointer">Search</button>

                                        </div>


                                    </div>
                                </div>


                                <div className="text-white h-70  mt-4  overflow-scroll scrollbar-none border-t border-[#494133] cursor-pointer">
                                    {LoadingState ? (
                                        <p className="text-gray-400 text-sm p-4">
                                            Loading transactions...
                                        </p>
                                    ) : error ? (
                                        <p className="text-red-500 text-sm p-4">
                                            {error}
                                        </p>
                                    ) : (
                                        TransactionState.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-3">

                                                <div className="flex gap-4">
                                                    <div
                                                        className="w-10 h-10 rounded-lg overflow-hidden shadow-[0_0_3px_rgba(216,180,92,0.2)]"
                                                        dangerouslySetInnerHTML={{ __html: item.img }}
                                                    />

                                                    <div>
                                                        <p className="text-sm font-medium">{item.PaymentName}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {item.PaymentDate} • {item.PaymentTime}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-[#231A0B] rounded-xl px-3 py-1 hidden sm:block">
                                                    <p className="text-sm">{item.Categories}</p>
                                                </div>

                                                <div>
                                                    <p
                                                        className={
                                                            item.Type === "credit"
                                                                ? "text-green-500 font-medium"
                                                                : "text-red-500 font-medium"
                                                        }
                                                    >
                                                        {item.Type === "credit" ? "+" : "-"} ₹ {item.PaymentAmount}
                                                    </p>
                                                </div>

                                            </div>
                                        ))
                                    )}
                                </div>





                            </div>

                            <div className="border border-[#494133] p-4 rounded-xl">
                                <h2 className="text-[#d8b45c] font-semibold text-lg mb-4">
                                    QUICK ACTIONS
                                </h2>

                                <div className="sm:grid flex flex-row  sm:overflow-visible overflow-x-auto  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 ">

                                    {[
                                        {
                                            title: "Transfer Money",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-transfer-up-down w-6 rotate-90 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M7 3v18" /> <path d="M20 6l-3 -3l-3 3" /> <path d="M10 18l-3 3l-3 -3" /> <path d="M17 3v18" /></svg>

                                            ),
                                        },
                                        {
                                            title: "Pay Bills",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-receipt w-6 text-[#d8b45c]">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            title: "Mobile Recharge",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile-dollar w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M13 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v5" /> <path d="M11 4h2" /> <path d="M12 17v.01" /> <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /> <path d="M19 21v1m0 -8v1" /> </svg>
                                            ),
                                        },
                                        {
                                            title: "Scan & Pay",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-scan w-7 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M5 12h14" /> <path d="M3 7v-2a2 2 0 0 1 2 -2h2" /> <path d="M3 17v2a2 2 0 0 0 2 2h2" /> <path d="M17 3h2a2 2 0 0 1 2 2v2" /> <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
                                            ),
                                        },
                                        {
                                            title: "UPI Payments",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D8B45C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 rotate-90"><path d="M6 18L11 6L18 13" /><path d="M11 18L16 6L22 13" /></svg>
                                            ),
                                        },
                                        {
                                            title: "International Transfer",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-world w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /> <path d="M3.6 9h16.8" /> <path d="M3.6 15h16.8" /> <path d="M11.5 3a17 17 0 0 0 0 18" /> <path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Add Beneficiary",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Schedule Payment",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-dollar w-6 text-[#d8b45c]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.866 10.45a9 9 0 1 0 -7.815 10.488" /><path d="M12 7v5l1.5 1.5" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Cheque Book",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-article w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12" /> <path d="M7 8h10" /> <path d="M7 12h10" /> <path d="M7 16h10" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Fixed Deposit",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-mailgun w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M17 12a2 2 0 1 0 4 0a9 9 0 1 0 -2.987 6.697" /> <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Recurring Deposit",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chart-donut-2 w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 3v5m4 4h5" /> <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                                            ),
                                        },
                                        {
                                            title: "Statement",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download w-6 text-[#d8b45c]"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /> <path d="M7 11l5 5l5 -5" /> <path d="M12 4l0 12" /></svg>
                                            ),
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-[#494133] rounded-xl p-4 flex flex-col  items-center justify-center gap-2 cursor-pointer hover:border-[#d8b45c] hover:bg-[#d8b45c]/5 transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="text-[#d8b45c]">
                                                {item.icon}
                                            </div>

                                            <p className="text-white sm:mt-0 mt-0.5 text-xs text-center sm:text-wrap text-nowrap leading-tight ">
                                                {item.title}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-3 grid grid-col-2 border border-[#494133] w-full p-5 md:pr-10 rounded-lg backdrop-blur-md bg-white/5 gap-2">

                        <p className="text-[#d8b45c] font-semibold ">Transaction Analytics</p>




                        <div className="grid lg:grid-cols-[70%_30%] gap-5">

                            <div className="flex flex-col gap-5">

                                {/* Cards */}
                                <div className="grid-cols-1  sm:grid sm:grid-cols-3 gap-y-2 md:gap-4">

                                    <div className="border border-[#494133] rounded-lg p-3">
                                        <div className="flex gap-3">


                                            <div className="group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border text-green-500   transition-all duration-300 ">
                                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="relative z-10 h-8 w-8 text-green-500"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                                </svg>
                                            </div>


                                            <div className="block text-white p-2">
                                                <p className="text-md font-semibold">
                                                    Total Income
                                                </p>

                                                <p className="text-green-500 text-lg font-bold">
                                                    <span> ₹</span> 69,21,475
                                                </p>

                                                <div className="mt-2 flex items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4 text-green-500"
                                                    >
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <line x1="12" y1="19" x2="12" y2="5" />
                                                        <polyline points="5 12 12 5 19 12" />
                                                    </svg>

                                                    <p className="text-green-500 font-semibold text-xs">
                                                        12.4%
                                                    </p>

                                                    <span className="text-gray-400 text-xs">
                                                        vs last month
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>





                                    <div className="border border-[#494133] rounded-lg p-3">
                                        <div className="flex gap-3">


                                            <div className="group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border border-red-500  transition-all duration-300 ">
                                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trending-down  h-7 w-7 text-red-500">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M3 7l6 6l4 -4l8 8" />
                                                    <path d="M21 10l0 7l-7 0" />
                                                </svg>
                                            </div>


                                            <div className="block text-white p-2 ">
                                                <p className="text-md font-semibold">
                                                    Total Expense
                                                </p>

                                                <p className="text-red-500 text-lg font-bold">
                                                    <span> ₹</span> 21,65,231
                                                </p>

                                                <div className="mt-2 flex justify-center items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4 text-red-500 rotate-180"
                                                    >
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <line x1="12" y1="19" x2="12" y2="5" />
                                                        <polyline points="5 12 12 5 19 12" />
                                                    </svg>

                                                    <p className="text-red-500 font-semibold text-xs">
                                                        23.6%
                                                    </p>

                                                    <span className="text-gray-400 text-xs">
                                                        vs last month
                                                    </span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>






                                    <div className="border border-[#494133] rounded-lg p-3 pr-0">
                                        <div className="flex gap-3">


                                            <div className="  group relative flex mt-3 h-11 w-11 items-center justify-center align-middle rounded-2xl border text-yellow-600   transition-all duration-300 ">
                                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#d8b45c]/10 via-transparent to-[#d8b45c]/20 "></div>

                                                <svg className="relative z-10 h-8 w-8 text-yellow-600" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="28" cy="10" r="0.8" /><circle cx="35" cy="6" r="0.8" /><circle cx="43" cy="8" r="0.8" /><circle cx="50" cy="6" r="0.8" /><circle cx="57" cy="10" r="0.8" /><circle cx="26" cy="17" r="0.8" /><circle cx="33" cy="14" r="0.8" /><circle cx="41" cy="15" r="0.8" /><circle cx="49" cy="14" r="0.8" /><circle cx="56" cy="17" r="0.8" /><circle cx="30" cy="22" r="0.8" /><circle cx="38" cy="20" r="0.8" /><circle cx="46" cy="20" r="0.8" /><circle cx="54" cy="22" r="0.8" /></g><circle cx="42" cy="28" r="14" stroke="currentColor" strokeWidth="3" fill="none" /><text x="42" y="35" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="700" textAnchor="middle" fill="currentColor">$</text><g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M10 49L25 45L38 52" /><path d="M10 58L33 66L58 53" /><path d="M38 52L54 47C57 46 60 47 61 50C62 53 60 56 57 58L41 66" /><path d="M31 52L43 52" /></g><g fill="currentColor"><circle cx="28" cy="55" r="1" /><circle cx="31" cy="56" r="1" /><circle cx="34" cy="57" r="1" /><circle cx="37" cy="58" r="1" /></g></svg>
                                            </div>


                                            <div className="block text-white p-2">
                                                <p className="text-md font-semibold">
                                                    Total Investment
                                                </p>

                                                <p className="text-yellow-600 text-lg font-bold">
                                                    <span> ₹</span> 90,86,706
                                                </p>

                                                <div className="mt-2 flex items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4 text-yellow-600 "
                                                    >
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <line x1="12" y1="19" x2="12" y2="5" />
                                                        <polyline points="5 12 12 5 19 12" />
                                                    </svg>




                                                    <p className="text-yellow-600 font-semibold text-xs">
                                                        12.4%
                                                    </p>

                                                    <span className="text-gray-400 text-xs">
                                                        vs last month
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Area Chart */}
                                <div className="border rounded-xl">



                                    <div className="border border-[#494133] p-4 rounded-lg">
                                        <div className="flex items-center justify-between w-full">


                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-medium">
                                                    Income vs Expenses Overview
                                                </p>

                                                <div className="relative group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 text-gray-500 cursor-pointer"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /> <path d="M12 9h.01" /> <path d="M11 12h1v4h1" /></svg>

                                                    <div className="absolute left-0 top-7 hidden group-hover:block w-80 p-2 rounded-lg border border-[#544724] bg-black shadow shadow-[#544724] z-50">
                                                        <p className="text-white text-xs">
                                                            Displays a comparison of your income and expenses over the selected period.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1 border border-[#d8b45c] rounded-lg px-3 py-2 cursor-pointer hover:scale-103 transition-all duration-100" onClick={() => { SetchartDialogBox(!chartDialogBox) }}>
                                                    <button className="text-white text-xs cursor-pointer">
                                                        Chart Type
                                                    </button>

                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 text-yellow-500" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M6 9l6 6l6 -6" /> </svg>



                                                </div>
                                                <div className={`border  border-[#615027] text-sm text-center text-white absolute mt-1 p-3 w-[9%] rounded-xl bg-black z-50 ${chartDialogBox ? "block transition-all duration-100" : "hidden"}`}>
                                                    <p className="p-1.5 hover:bg-[#d8b45c] hover:text-black hover:font-semibold cursor-pointer rounded-lg">Area Chart</p>
                                                    <p className="p-1.5 hover:bg-[#d8b45c] hover:text-black hover:font-semibold cursor-pointer rounded-lg">Line Chart</p>
                                                    <p className="p-1.5 hover:bg-[#d8b45c] hover:text-black hover:font-semibold cursor-pointer rounded-lg">Bar Chart</p>



                                                </div>
                                            </div>

                                        </div>


                                        <div className="mt-5">
                                            <IncomeExpenseChart />

                                        </div>


                                    </div>
                                </div>

                            </div>

                            {/* Pie Chart */}
                            <div className="border rounded-xl h-full">
                                <DounutChart />
                            </div>

                        </div>








                    </div>

                    <div className="mt-3 block lg:flex  border border-[#494133] w-full p-5 pr-10 rounded-lg backdrop-blur-md bg-white/5 gap-3">

                        <div className="border border-[#494133] p-5 w-full rounded-lg">

                            <p className="text-white text-md font-semibold">
                                Cards
                            </p>

                            <div className="w-full mt-3">


                                <div
                                    ref={cardContainerRef}
                                    onScroll={handleScroll}
                                    className=" flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
                                >

                                    {cardInfo.map((card, index) => (

                                        <div
                                            key={index}
                                            className="w-full shrink-0 snap-center flex justify-center px-2 py-3"
                                        >


                                            <div className="relative w-full max-w-105">


                                                <img
                                                    src={card.img}
                                                    alt={`NBI Card ${index + 1}`}
                                                    className=" block w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
                                                />



                                                <div
                                                    className=" absolute left-[11%] top-[51%] "
                                                    style={{
                                                        color: card.textColor
                                                    }}
                                                >


                                                    <p
                                                        className=" text-[clamp(11px,2.7vw,18px)] tracking-[0.12em] font-medium whitespace-nowrap"
                                                    >
                                                        {card.CardNumber}
                                                    </p>



                                                    <p
                                                        className=" mt-[2%] text-[clamp(8px,2vw,13px)] tracking-[0.16em] font-semibold uppercase whitespace-nowrap"
                                                    >
                                                        {card.CardName}
                                                    </p>



                                                    <div
                                                        className=" flex items-center gap-[clamp(12px,4vw,28px)] mt-[2%] text-[clamp(7px,1.6vw,10px)]"
                                                    >

                                                        <div>
                                                            <p className="font-semibold text-[0.75em]" style={{ color: card.mutedColor }}>
                                                                VALID THRU
                                                            </p>

                                                            <p className="font-medium">
                                                                {card.ValidThru}
                                                            </p>
                                                        </div>


                                                        <div>
                                                            <p className="font-semibold text-[0.75em]" style={{ color: card.mutedColor }}>
                                                                CVV
                                                            </p>

                                                            <p className="font-medium tracking-wider">
                                                                {card.CVV}
                                                            </p>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* DOTS */}
                                <div className="flex items-center justify-center gap-2 mt-0">

                                    {cardInfo.map((_, index) => (

                                        <button
                                            key={index}
                                            onClick={() => goToCard(index)}
                                            className={` rounded-full cursor-pointer transition-all duration-300

                                                    ${activeCard === index
                                                    ? "w-5 h-2 bg-[#d8b45c]"
                                                    : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
                                                }
                                                  `}
                                        />

                                    ))}

                                </div>
                                <div className="flex p-1 mt-3 gap-5" >
                                    <button className="border border-[#d8b45c] cursor-pointer text-white text-sm p-2 rounded-lg hover:text-black hover:bg-[#d8b45c] font-medium mr-auto w-full ">Freeze Card</button>
                                    <button className="border border-[#d8b45c] cursor-pointer text-white text-sm p-2 rounded-lg hover:text-black hover:bg-[#d8b45c] font-medium ml-auto w-full">Manage Card</button>

                                </div>

                            </div>

                        </div>












                        <div className="border border-[#494133] p-5 w-full rounded-lg ">

                            <div className="flex ">
                                <p className="text-white text-md font-semibold">Upcoming Payments</p>
                                <div className="ml-auto flex gap-1 align-middle items-center group hover:border-[#d8b55c8b] border border-[#d8b45c] p-2 rounded-full ">

                                    <p className="text-[#d8b45c] text-xs font-semibold group-hover:text-[#d8b55c8b] cursor-pointer">View All</p>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 text-[#d8b45c] font-semibold group-hover:text-[#d8b55c8b] cursor-pointer" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                            <path strokeDasharray={20} d="M3 12h17.5">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                            </path>
                                            <path strokeDasharray={12} strokeDashoffset={12} d="M21 12l-7 7M21 12l-7 -7">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                            </path>
                                        </g>
                                    </svg>
                                </div>

                            </div>

                            <div className="p-5 pl-0 pr-0 pb-0">

                                <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-5 gap-2 overflow-scroll scrollbar-none h-60">

                                    {/* Header */}
                                    <p className="text-[#d8b45c] text-xs border-b border-[#494133] pb-1 text-center">
                                        PAYMENT
                                    </p>

                                    <p className="text-[#d8b45c] text-xs text-center border-b border-[#494133] pb-1 ">
                                        DUE DATE
                                    </p>

                                    <p className="text-[#d8b45c] text-xs text-center border-b border-[#494133] pb-1">
                                        AMOUNT
                                    </p>

                                    {/* Row */}

                                    {upcomingPaymentDetail.map((payment, index) => (
                                        <React.Fragment key={payment.id} >
                                            <div className="flex items-center gap-3 mt-3 cursor-pointer">
                                                <img
                                                    src={payment.img}
                                                    className="w-5 h-5"
                                                    alt="Netflix"
                                                />

                                                <p className="text-white text-sm font-medium">
                                                    {payment.PaymentName}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-center mt-3">
                                                <p
                                                    className={` text-xs font-medium ${payment.Status === "Upcoming" ? "text-[#d8b45c]" : payment.Status === "Urgent" ? "text-red-500" : payment.Status === "Scheduled" ? "text-gray-400" : "text-white"}`}>{payment.DueDate}</p>
                                            </div>

                                            <div className="flex items-center justify-center mt-3">
                                                <p className="text-white text-sm font-semibold">
                                                    <span>₹</span> {payment.DueAmount}
                                                </p>
                                            </div>
                                        </React.Fragment>

                                    ))}

                                </div>
                                <div className="mt-auto pt-5 ">
                                    <button className="w-full bg-[#d5a220] text-black font-semibold rounded-md py-2  hover:bg-[#d79a00c3] cursor-pointer">
                                        Pay All Dues
                                    </button>
                                </div>


                            </div>

                        </div>
















                        <div className="border border-[#494133] p-5 w-full rounded-lg flex flex-col">

                            <p className="text-white text-md font-semibold">
                                Quick Transfers
                            </p>

                            <div className="flex flex-col justify-between flex-1 mt-5">
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 overflow-y-scroll scrollbar-none max-h-45">

                                    {FetchContactDetail.map((contact, index) => (
                                        <div key={index} className="max-w-fit text-center cursor-pointer">
                                            <img src={contact.img} className="w-15 h-15 rounded-full border-2 border-[#d8b45c] "></img>
                                            <p className="text-[#d8b45c] mt-0.5 text-sm font-medium" >{contact.name}</p>
                                        </div>
                                    ))}


                                    <div className="max-w-fit text-center cursor-pointer group" onClick={() => setShowAddContact(true)}>
                                        <div className="w-13 h-13 rounded-full border-2 border-dashed border-[#d8b45c] flex items-center justify-center transition-all duration-300 hover:bg-[#d8b45c]/10 hover:scale-105">

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-[#d8b45c]"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5v14" /><path d="M5 12h14" /></svg>

                                        </div>

                                        <p className="text-[#d8b45c] mt-2 text-sm font-medium">
                                            Add New
                                        </p>

                                    </div>


                                </div>
                                <div className="mt-5">
                                    <div className="relative w-full">


                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="#d8b45c" d="M8 3h10l-1 2h-3.26c.48.58.84 1.26 1.05 2H18l-1 2h-2a5.56 5.56 0 0 1-4.8 4.96V14h-.7l6 7H13l-6-7v-2h2.5c1.76 0 3.22-1.3 3.46-3H7l1-2h4.66C12.1 5.82 10.9 5 9.5 5H7z" />
                                        </svg>

                                        <input type="number" placeholder="Enter Amount" className="w-full rounded-md border border-[#d8b45c] bg-transparent py-2 pl-10 pr-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d8b45c]" />


                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => setShowAddContact(true)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer" >
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="#d8b45c" d="M9.175 10.825Q8 9.65 8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12t-2.825-1.175M4 18v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18" />
                                        </svg>

                                    </div>

                                    <div className="mt-2 ">
                                        <button className="w-full bg-[#d5a220] text-black font-semibold rounded-md py-2 pl-10 pr-10 text-sm cursor-pointer hover:bg-[#d79a00c3] ">Transfer Now</button>
                                    </div>
                                </div>


                            </div>



                        </div>




                    </div>
                    <div className="mt-3    border border-[#494133] w-full p-5 pr-10 rounded-lg backdrop-blur-md bg-white/5 gap-3 grid grid-cols-1 lg:grid-cols-[60%_40%]">
                        <div className="border border-[#494133] rounded-lg p-5 bg-[#0b0b0b]">

                            {/* HEADER */}
                            <div className="flex items-center justify-between">

                                <div className="flex gap-3  items-center align-middle">
                                    <p className="text-[#d8b45c] md:text-base text-sm font-semibold tracking-wide">
                                        MARKET WATCH
                                    </p>
                                    {marketOpen ? (
                                        <p className="text-black text-xs  p-2 pl-2.5 pr-2.5  rounded-full font-bold bg-green-600">
                                            OPEN
                                        </p>
                                    ) : (
                                        <p className="text-black text-xs  p-2 pl-2.5 pr-2.5 rounded-full font-bold bg-red-700">
                                            CLOSED
                                        </p>
                                    )}

                                </div>

                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <p className="text-[#d8b45c] text-sm group-hover:text-[#b99745] transition-colors">
                                        View All
                                    </p>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 text-[#d8b45c] font-semibold group-hover:text-[#d8b55c8b] cursor-pointer " viewBox="0 0 24 24" style={{ animation: "moveArrow 1s ease-in-out infinite" }}>
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                            <path strokeDasharray={20} d="M3 12h17.5">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                            </path>
                                            <path strokeDasharray={12} strokeDashoffset={12} d="M21 12l-7 7M21 12l-7 -7">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                            </path>
                                        </g>
                                    </svg>
                                </div>

                            </div>


                            {/* COLUMN HEADERS */}
                            <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] grid-cols-[1fr_1fr] gap-4 mt-5 pb-2 border-b border-[#252525]">

                                <p className="text-gray-500 text-[11px] uppercase tracking-wide">
                                    Market
                                </p>

                                <p className="text-gray-500 text-[11px] uppercase tracking-wide text-center">
                                    Value
                                </p>

                                <p className="text-gray-500 text-[11px] uppercase tracking-wide text-center md:grid hidden">
                                    Change
                                </p>

                                <p className="text-gray-500 text-[11px] uppercase tracking-wide text-center md:grid hidden">
                                    Trend
                                </p>

                            </div>


                            {/* SENSEX */}
                            {marketWatch.map((market) => (


                                <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] grid-cols-[1fr_1fr] gap-4 items-center py-4 border-b border-[#252525]" >


                                    {/* Market */}
                                    <div className="flex items-center gap-3">

                                        <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center">
                                            <img
                                                src={
                                                    market.name === "S&P BSE SENSEX"
                                                        ? "/stockLogo/bse.png"
                                                        : market.name === "NIFTY 50"
                                                            ? "/stockLogo/nifty.png"
                                                            : market.name === "NIFTY BANK"
                                                                ? "/stockLogo/bankNifty.png"
                                                                : market.name === "Gold Dec 26"
                                                                    ? "/stockLogo/gold.png"
                                                                    : "/stockLogo/default.png"
                                                }
                                                alt={market.name}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-white text-sm font-semibold">
                                                {market.name}
                                            </p>

                                            <p className="text-gray-500 text-[10px] mt-0.5">
                                                {market.exchange}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Value */}
                                    <p className="text-white text-sm font-semibold text-center">
                                        <span>{market.currency} </span>{market.price.toLocaleString("en-IN")}
                                    </p>


                                    {/* Change */}
                                    {market.pChange >= 0 ? (
                                        <div className=" items-center justify-center gap-1 md:flex hidden">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#49CC52"
                                                    d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"
                                                />
                                            </svg>

                                            <p
                                                className="text-sm font-semibold text-[#49CC52]"

                                            >
                                                {market.pChange}%
                                            </p>

                                        </div>
                                    ) : (
                                        <div className=" items-center justify-center gap-1 md:flex hidden">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-4 h-4 rotate-180"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    fill="#F92F34"
                                                    d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"
                                                />
                                            </svg>

                                            <p
                                                className="text-sm font-semibold text-[#F92F34]"

                                            >
                                                {Math.abs(market.pChange)}%
                                            </p>

                                        </div>
                                    )}



                                    {/* Chart */}
                                    <div className="h-10 w-full md:flex hidden">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={market.sparkline}
                                                margin={{
                                                    top: 4,
                                                    right: 0,
                                                    left: 0,
                                                    bottom: 0
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id={`gradient-${market.symbol}`} x1="0" y1="0" x2="0" y2="1" >
                                                        <stop
                                                            offset="0%"
                                                            stopColor={market.pChange >= 0 ? "#49CC52" : "#F92F34"}
                                                            stopOpacity={0.6}
                                                        />

                                                        <stop
                                                            offset="100%"
                                                            stopColor={market.pChange >= 0 ? "#49CC52" : "#F92F34"}
                                                            stopOpacity={0}
                                                        />
                                                    </linearGradient>
                                                </defs>

                                                <Tooltip
                                                    formatter={(value) => [
                                                        `${Number(value).toLocaleString()}`,
                                                        "Price"
                                                    ]}
                                                    labelFormatter={(label) => `Time: ${label}`}
                                                    contentStyle={{
                                                        backgroundColor: "#111111",
                                                        border: "1px solid #494133",
                                                        borderRadius: "8px",
                                                        color: "#fff"
                                                    }}
                                                    labelStyle={{
                                                        color: "#999"
                                                    }}
                                                    itemStyle={{
                                                        color: market.pChange >= 0 ? "#49CC52" : "#F92F34"
                                                    }}
                                                />

                                                <Area
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke={market.pChange >= 0 ? "#49CC52" : "#F92F34"}
                                                    strokeWidth={1.5}
                                                    fill={`url(#gradient-${market.symbol})`}
                                                    dot={false}
                                                    activeDot={{
                                                        r: 4,
                                                        fill: market.pChange >= 0 ? "#49CC52" : "#F92F34",
                                                        stroke: "#111",
                                                        strokeWidth: 2
                                                    }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>








                                </div>
                            ))}


                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-2 pt-3 ">

                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 rounded-full bg-[#33D17A] animate-live "></span>


                                    <p className="text-gray-500 text-xs">
                                        Market data  {" "}
                                        {lastUpdatedtime
                                            ? (() => {
                                                const minutes = Math.floor(
                                                    (currentTime.getTime() - lastUpdatedtime.getTime()) / 60000
                                                );

                                                return minutes === 0
                                                    ? "just now"
                                                    : `${minutes} min ago`;
                                            })()
                                            : "loading..."
                                        }
                                    </p>

                                </div>

                                <p className="text-[#d8b45c] text-xs">
                                    NSE • BSE
                                </p>

                            </div>

                        </div>


                        <div className="border border-[#494133]  p-5 w-full rounded-lg ">
                            <div>
                                <div className="flex ">
                                    <p className="text-[#d8b45c] font-semibold ">EXCHANGE RATES</p>
                                    <div className="flex gap-1 ml-auto items-center align-middle cursor-pointer " >
                                        <p className="text-[#d8b45c] text-sm ">View All</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 text-[#d8b45c] font-semibold group-hover:text-[#d8b55c8b] cursor-pointer " viewBox="0 0 24 24" style={{ animation: "moveArrow 1s ease-in-out infinite" }}>
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                <path strokeDasharray={20} d="M3 12h17.5">
                                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                                </path>
                                                <path strokeDasharray={12} strokeDashoffset={12} d="M21 12l-7 7M21 12l-7 -7">
                                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                                </path>
                                            </g>
                                        </svg>
                                    </div>

                                </div>

                            </div>
                            <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-5 gap-2  mt-2 pt-2">
                                <p className="text-gray-400 text-sm text-center border-b border-gray-400  pb-1">CURRENCY</p>
                                <p className="text-gray-400 text-sm text-center border-b border-gray-400 pb-1">RATE</p>
                                <p className="text-gray-400 text-sm text-center border-b border-gray-400 pb-1">CHANGE</p>


                                {Object.entries(rateInfo).map(([currency, rate]) => (
                                    <React.Fragment key={currency}>

                                        <div className="flex items-center gap-3 mt-1 justify-center">
                                            <img src={`https://flagcdn.com/${countryMap[currency]}.svg`} className="w-9 h-9 rounded-full object-contain" alt={currency} />
                                            <p className="text-white text-sm font-semibold">{currency}</p>
                                        </div>


                                        <div className="flex items-center justify-center mt-1">
                                            <p className="text-white">{rate.toFixed(2)}</p>
                                        </div>


                                        <div className="flex items-center justify-center gap-1 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"> <path fill="#49cc52" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"></path> </svg>

                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"> <path fill="#f92f34" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z"></path> </svg> */}

                                            <p className="text-[#49CC52] text-sm font-semibold">0.12 <span>%</span></p>
                                        </div>
                                        <div className="col-span-3 h-px bg-[#252525] mt-1"></div>





                                    </React.Fragment>



                                ))}


                                <div className="col-span-3 flex items-center justify-between mt-1 ">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#33D17A] animate-live "></span>

                                        <p className="text-gray-500 text-xs">
                                            Updated {lastUpdated.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={currencyRate} className="w-4 text-gray-500 cursor-pointer" viewBox="0 0 24 24">
                                            <path fill="#6a7282" d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"></path>
                                        </svg>

                                    </div>

                                    <p className="text-[#d8b45c] text-xs font-medium">
                                        All rates are live
                                    </p>
                                </div>

                            </div>




                        </div>


                    </div>



                    <div className="mt-3 grid grid-cols-1 lg:grid-cols-[40%_60%] border border-[#494133] w-full p-5  rounded-lg backdrop-blur-md bg-white/5 gap-3  ">






                        <div className="w-full overflow-hidden rounded-xl border border-[#494133] bg-[#0b0b0b]">

                            <div className="grid grid-cols-1 md:grid-cols-1">

                                {/* ================= LEFT: CREDIT SCORE ================= */}
                                <div className="flex min-w-0 flex-col p-5 pb-0 md:border-r md:border-[#494133]">

                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold tracking-wide text-[#D8B45C]">
                                            CREDIT SCORE
                                        </p>

                                        <button
                                            className="group flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#D8B45C] transition hover:text-[#f0cf72]"
                                        >
                                            View All

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 12h17" />
                                                <path d="m14 5 7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>


                                    {/* Gauge */}
                                    <div className="flex flex-1 flex-col items-center justify-center py-5">

                                        <div className="relative w-full max-w-57.5">

                                            <svg
                                                viewBox="0 0 200 115"
                                                className="w-full overflow-visible"
                                            >

                                                <defs>
                                                    <linearGradient
                                                        id="scoreArcGradient"
                                                        x1="0"
                                                        y1="0"
                                                        x2="200"
                                                        y2="0"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop offset="0%" stopColor="#e04b3f" />
                                                        <stop offset="50%" stopColor="#D8B45C" />
                                                        <stop offset="100%" stopColor="#33D17A" />
                                                    </linearGradient>
                                                </defs>


                                                {/* Outer dotted arc */}
                                                <path
                                                    d="M 6 100 A 94 94 0 0 1 194 100"
                                                    fill="none"
                                                    stroke="url(#scoreArcGradient)"
                                                    strokeWidth="2"
                                                    strokeDasharray="1 7"
                                                    strokeLinecap="round"
                                                    opacity="0.55"
                                                />


                                                {/* Main arc */}
                                                <path
                                                    d="M 20 100 A 80 80 0 0 1 180 100"
                                                    fill="none"
                                                    stroke="url(#scoreArcGradient)"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                />


                                                {/* Needle */}
                                                <g
                                                    style={{
                                                        transform: `rotate(${-90 + ((clampedScore - 300) / 600) * 180}deg)`,
                                                        transformOrigin: "100px 100px",
                                                        transition: "transform 0.6s ease",
                                                    }}
                                                >
                                                    <line
                                                        x1="100"
                                                        y1="100"
                                                        x2="100"
                                                        y2="34"
                                                        stroke="#d8b45c"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                    />

                                                    <circle
                                                        cx="100"
                                                        cy="100"
                                                        r="4"
                                                        fill="#d8b45c"
                                                    />
                                                </g>

                                            </svg>


                                            {/* Score */}
                                            <div className=" flex flex-col items-center">
                                                <p className="text-3xl font-bold leading-none text-white">
                                                    {CreditScore}
                                                </p>
                                            </div>

                                        </div>


                                        {/* Score label */}
                                        <p className="mt-1 text-sm font-semibold text-[#33D17A]">
                                            {getScoreLabel(CreditScore)}
                                        </p>


                                        {/* Monthly change */}
                                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                                            <span className="text-[#33D17A]">
                                                ↑ {ScoreChange} points
                                            </span>

                                            from last month
                                        </p>

                                    </div>


                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-[#272727] pt-3 text-xs text-gray-500">

                                        <span>
                                            Powered by{" "}
                                            <span className="font-semibold text-[#4E8DF5]">
                                                CIBIL
                                            </span>
                                        </span>

                                        <span>
                                            Updated {ScoreUpdatedDaysAgo} days ago
                                        </span>

                                    </div>

                                </div>


                                {/* ================= RIGHT: SCORE FACTORS ================= */}
                                <div className="flex min-w-0 flex-col justify-center p-5">

                                    <div className="mb-5 flex items-center justify-between">

                                        <p className="text-sm font-semibold tracking-wide text-[#D8B45C]">
                                            SCORE FACTORS
                                        </p>

                                        <span className="rounded-full border border-[#494133] px-2.5 py-1 text-[10px] text-gray-500">
                                            4 Factors
                                        </span>

                                    </div>


                                    <div className="space-y-5">

                                        {ScoreFactors.map((factor) => (

                                            <div key={factor.label}>

                                                {/* Label + percentage */}
                                                <div className="mb-2 flex items-center justify-between">

                                                    <span className="text-xs text-gray-300">
                                                        {factor.label}
                                                    </span>

                                                    <span className="text-xs font-semibold text-white">
                                                        {factor.value}%
                                                    </span>

                                                </div>


                                                {/* Progress */}
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#272727]">

                                                    <div
                                                        className="h-full rounded-full bg-linear-to-r from-[#D8B45C] to-[#33D17A] transition-all duration-700"
                                                        style={{
                                                            width: `${factor.value}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        ))}

                                    </div>


                                    {/* Bottom insight */}
                                    <div className="mt-3 rounded-lg border border-[#494133]/60 bg-[#12110e] px-3 py-2.5">

                                        <p className="text-[11px] text-gray-500">
                                            Credit utilization and payment history have the
                                            biggest impact on your score.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>






                        {/* ----------------------------------------------------------------------------------------------- */}


                        <section className="w-full rounded-lg border border-[#494133]   p-6 text-white">

                            {/* Header */}
                            <div className="mb-1 flex items-center justify-between">

                                <div className="flex items-center gap-4">



                                    <div>
                                        <p className=" font-semibold   text-[#D8B45C]">
                                            FINANCIAL NEWS
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Latest updates from the world of finance
                                        </p>
                                    </div>

                                </div>


                                {/* View All */}
                                <button
                                    className=" hidden sm:flex items-center gap-3 rounded-lg  text-sm font-semibold text-[#D8B45C] transition  hover:bg-[#D8B45C]/10"
                                >
                                    View All

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 text-[#d8b45c] font-semibold group-hover:text-[#d8b55c8b] cursor-pointer " viewBox="0 0 24 24" style={{ animation: "moveArrow 1s ease-in-out infinite" }}>
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                            <path strokeDasharray={20} d="M3 12h17.5">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                            </path>
                                            <path strokeDasharray={12} strokeDashoffset={12} d="M21 12l-7 7M21 12l-7 -7">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                            </path>
                                        </g>
                                    </svg>
                                </button>

                            </div>


                            {/* News List */}
                            <div className="overflow-hidden rounded-2xl  ">

                                {FinanceNews.map((article, index) => (

                                    <a href={article.url} key={article.uuid} target="_blank" rel="noopener noreferrer" className={` group flex gap-5 p-4 sm:p-5 transition hover:bg-[#0e100f] ${index !== FinanceNews.length - 1 ? "border-b border-[#202222]" : ""} `}
                                    >

                                        {/* Image */}
                                        <div className="h-28 w-36 shrink-0 overflow-hidden rounded-xl border border-[#272727] bg-[#111] sm:h-32 sm:w-56">

                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className=" h-full w-full object-cover transition duration-300 group-hover:scale-105 "
                                            />

                                        </div>


                                        {/* Content */}
                                        <div className="min-w-0 flex-1">

                                            <div className="flex items-start justify-between gap-4">

                                                <p className=" line-clamp-1 text-[15px] font-medium leading-6  text-white sm:text-[15px] ">
                                                    {article.title}
                                                </p>

                                                {/* Arrow */}
                                                <span className=" hidden text-2xl  text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#D8B45C] sm:block">
                                                    ›
                                                </span>

                                            </div>


                                            {/* Description */}
                                            <p
                                                className="hidden max-w-3xl text-sm leading-5 text-gray-400 sm:block"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {article.description}
                                            </p>


                                            {/* Meta */}
                                            <div className=" mt-3 flex flex-wrap items-center gap-3 text-xs  text-gray-500 ">

                                                {/* Calendar */}
                                                <span className="flex items-center gap-1.5">

                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"> <rect x="3" y="4" width="18" height="18" rx="2" /> <line x1="16" y1="2" x2="16" y2="6" /> <line x1="8" y1="2" x2="8" y2="6" /> <line x1="3" y1="10" x2="21" y2="10" /> </svg>

                                                    {new Date(article.published_at).toLocaleDateString("en-IN", {
                                                        timeZone: "Asia/Kolkata",
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}

                                                </span>


                                                <span className="text-[#555]">
                                                    |
                                                </span>


                                                <span className="font-medium text-[#D8B45C]">
                                                    {article.source}
                                                </span>

                                            </div>

                                        </div>

                                    </a>

                                ))}

                            </div>


                            {/* Footer */}
                            <div className="mt-2 flex items-center justify-between">

                                <button
                                    className=" flex items-center gap-2 text-sm font-semibold text-[#D8B45C] transition hover:text-[#f0cf72] cursor-pointer"
                                >
                                    Read More News

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 text-[#d8b45c] font-semibold group-hover:text-[#d8b55c8b] cursor-pointer " viewBox="0 0 24 24" >
                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                            <path strokeDasharray={20} d="M3 12h17.5">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate>
                                            </path>
                                            <path strokeDasharray={12} strokeDashoffset={12} d="M21 12l-7 7M21 12l-7 -7">
                                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" to={0}></animate>
                                            </path>
                                        </g>
                                    </svg>
                                </button>


                                <div className="flex items-center gap-2 text-xs text-gray-500">

                                    <span className="w-2 h-2 rounded-full bg-[#33D17A] animate-live "></span>

                                    Last updated: {getTimeAgo(lastFetchedAt, currentTimeNews)}

                                </div>

                            </div>

                        </section>

                    </div>
                    {/* ----------------------------------------------------------------------------------------------- */}











                </main>


            </div >

        </div >
    );
}

export default Dashboard;