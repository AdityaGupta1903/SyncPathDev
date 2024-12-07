"use client";
import * as React from "react";
import { Card } from "@fluentui/react-components";
import WarningIcon from "@mui/icons-material/Warning";
import { useEffect, useState } from "react";

import { getUserDetails } from "../../api/function";
import { useSession } from "next-auth/react";
import DoneIcon from "@mui/icons-material/Done";

export default function () {
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);
  const [isGdriveConnected, setIsGrdriveConnected] = useState<boolean>(false);

  const { data, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getdetails = async () => {
      if (data) {
        const res = await getUserDetails(data.user?.email ?? "");
        if (res) {
          if (res.isGmailConnected) {
            setIsGmailConnected(true);
          }
          if (res.isDriveConnected) {
            setIsGrdriveConnected(true);
          }
        }
      }
    };
    getdetails();
  }, [data]);

  // console.log(selectedSpreadSheetId);
  return (
    <>
      <div className="flex min-h-screen justify-center w-full items-center">
        <div className="w-full flex h-full  flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center">
            {isGmailConnected ? (
              <Card
                onClick={() => {}}
                className="w-[30%] m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCxnrD29c-ThXdrRlx-cDgae5X5nBYpw2fw&s"
                ></img>
                <div className="flex justify-center">Connect your Gmail</div>
              </Card>
            ) : (
              <Card
                onClick={() => {
                  window.open("http://localhost:3000/api/gmail/Login/login");
                }}
                className="w-[30%] m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCxnrD29c-ThXdrRlx-cDgae5X5nBYpw2fw&s"
                ></img>
                <div className="flex justify-center">Connect your Gmail</div>
              </Card>
            )}

            {isGmailConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>

          <div className="w-full h-full flex justify-center">
            {!isGdriveConnected ? (
              <Card
                onClick={() => {
                  window.open("http://localhost:3000/api/drive/Login/Login");
                }}
                className="w-[30%] p-3 m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="data:image/png;base64,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"
                ></img>
                <div className="flex justify-center"> Connect Your Drive</div>
              </Card>
            ) : (
              <Card
                onClick={() => {}}
                className="w-[30%] p-3 m-2 hover:cursor-pointer"
              >
                <img
                  className="h-[40px] object-contain"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABgFBMVEX/////uwAArjwAhf8AhB4AZt7/QTEAfv/G2/8Ag/8wlPQAsiv/wAAAd8T+XzcAZOAAfgCjzKn/twAApx4Aiv8Aqy8ArDUAgB7/8d0AqScAphkAqzD/znH/6cYAXN0MbuIAVtz/vSASrUb1+/b/9+ul2bE/t17/xEYHsUH/x1X/2pkvtFT/4K1XvnCMz5p6yYqx3bn/14+X06P/1IT/KRD/OwD/Qh3/Mh7m8OfJ3su31L1jpW1+sYSNu5IAiQCgmwAtiB8Yn0TVrhESiTBlkybvtxEAjiWVnBu8qB9Eix/X7dx4lyX/wDLLrB0Vjze+4sarohVRvGz/5bzFqh2CmSMAp0j/xk//y2Vpw3zb7+CVuN7/b0D+VCT/ycGmvu6dhMb/2dH1ZGDd6PZukebZc4v/VkY1j/v/npm0fq+Lq+qLidLqZWvOdpT/e3Ht8vr7WVDiaXo7e+C/dZ7/jIJsmOSUgMWfue3/m5P/u7Urdd5xe9T/6ebRW32Bdsj/dGPI3vpjgdDkAAAIwUlEQVR4nO2dCX8URRDFd2fQTXQ1uNmDDWeyBCLhCCG4SfBAAZGAoiiQeIAGiaAoBhFv89WZPWYyR/VMd9f0VHeH/wcYtt/vTe2rtx0tlV7wAhtZXFp+g5PlpUXqT0vJ8rndgpxbpv7MNHTe9g6/S5Tdu9+h/uAEzL8rrtRArveOU3/2glmcbThyWu06X629Sf3xC2Wt0XSc96W0an1QLtcmD1OfoDgW206PCzJiXayWPWrURyiMTsMZIGOsS+U+k9SHKIrZ5lCsD8XFulwdiFW7TX2KYphuD7VyplrCYpV9avupz1EEnUAr8Rnf+igQa2e8iKvNbbEcQWtdqW6LVTtGfRL1rIyHtBK0Vi82hNSiPop6ZsPGEowPV6sRsfZRn0U1c+2IVkIz/kI5Sm0P9WkUE/WVxyf8L+GnMbHK16hPo5aTjbhYM9zWOl+Ni1W7QX0elSyOx7Xin/Gtj+NaWT7jTyTeQn5rXUkYyxPrNPWJ1LECGMtxbvIZ61JSK08te+uHKUgrZ4Zrxl8GjOVhbbU13QbF4ooP8dgQWMvWFZGhFc+MT8YGH0tXxFN7WWJlz/hkbAisZWUjvwZOdz5rRZfCmFrUB1PBESA2BNbKEOsi01ieWGeoT5Y/15kTqz/j040FxoZALftWxJk0rdJXxBYjNvgcpT5b3swnlsKYtVJmPCs2BNayLD50Ul/CHuwZH+6SGVAfL19WU6b7AHZ8gJbCmLWsapjhpTAKa0VMn+5DtWxaEWczjeVZi9EwX800ll0Nc7xLhoFnfNZ0H6plT3zg8FUPKD6wl8Io1jTMyS6Z8SJC1uJ4CfvWsmRFhLpkmGR8gLpkhlrUx8yHzzjfQmhFTFsKY2JZ0TAvcRsruSLyxIZALRviwxS/Vs5M7BLSF9zGKlvRMLO6ZIa1IjOeLzYE1jJ+RexwfhP6hGc8x1IYwfiGmd0lw4RnfPZSGLOW4fFhbUJMq7C10rpkhlrUx8WR1iUzrBWsiDxLYUwso1fE9C4Zxp/xLVGpyoaviOJSOf4d5qwuGcbghjmrS2ZYS9pYJl9Cyu6SYXozvvW5lFjmNszZXTLMjERsCKxlaMPM0yXD3BRaCmNqmbki8nTJDGtdEFoKo2IZ+XcqfF0yw1o1Wa0MjQ+Ce06Y9twZhFoGNswnEWJNlUoYaxm3IvJ3yUnGV0ql4xi1qA8vCnQvmZPmid4DriHEMuwS0nWMsfr/rYv9GGuZFR+m5LVqnBw84ra8WGY1zGJdcpTm8BmHMdYyqWFGaNWe8x9yGqGWQQ3zqnxsaM5uP2ZHxIe0e8lZ9GKDz42dEB/Eu+RtY62GH3QUIZYh8UGmS/Zpd8JP2mP/iigvldOYjz5qH0ItIxpmuS55wEz8YRhrGdAwdxDTvX09/rRjCLUMaJhlu2SP5pHk4yYR1tK+YZbvkh1nYi35PNSK2Ek+Tyvku2Rn7ynogbcQYmneMGO65AZoBNSKqHd8QHwTtqfhR1rbMIteMAozxXqopSviovAFo23Gl1hPtbRh5r+XnGDQJcNgGmZt7zDju2QYKxvmjD9WTcPvkmFuI9TStGGeRnwV7k19sn0Ns+wFox7bXTKMdQ0zIjaEu2QYea20jA95dckwljXMuXXJMFY1zJgueZyjHUA1zLrFB3lfJbpkGEzDfEv16cXAdMkO179gT3zoIJbCZJcMg2mYtYoPmAtGQJcMM4mwlkYNc95dMowlK2LuXTIMpmHW5k+gMBeM2gL/jhUNM0YrRpcMg2mYNfmBGnkvWQTjf6BG3UvmjA0+mIZZix+oMUthSpcMY3jDjFkKJ4T/H3yGr4jKumQYRMNM/wO1ui4ZxuT4gLpglNElw2AaZuIfqDEXjDK7ZBh5rYgbZrVdMoyxDTNiKeTpkmEM/RMo1V0yjKHxAWEsvi4ZBtEw07UPKwhj8XXJDEycWoifVXm7ZBhEw0y2T8uHd/4uGQbhLKIYjwik49xdMgyiYSb67UL+u1CkS4aRb5iJhtac9FrYRl9Ql18RiRbE+VclmRDqkmHOlKtylGnE+vI1WV7Jga9el+Prb0jEunNgTI6KO4rn7sLLUix8SyLWyIGXpDjo5kH9O0mx/iERa11SrFy0ct17Z+XEItGqVJITKx9jeXzflRHrPpFY98YIjeW6G29JaNX9gUisOzLWyk0r130gYS2i+V6Sew9zFGvjvrhYVG9hqfRQXK3RHMVyfxSe8V2alNVHWKzcpnuf+k/mGEtiauWqlXh8oJtYPf4S+0LM11gej8Rm/M+UWpW2DlEay3sRheIDUXoPEMpauWvluncF1CLLWD6/iFhLgVj1xwLOItZKKD7kGht8+Gf8AmFs8OF+D3Of7n3qv/LO+MfUSpUEmholWnk5ntNa1NN9wCaft9QYy+MJl7W6v1Hr1Geda8Yr08qtcxmrSy3TkKc81lKmlev+zhEfun9Sq+TDMbXUGYuvYaZcCqM8y1arrlAsjvhAuxRGOZj1Iqo0lsvRMP9PrVCIzBVRrVaZDbMescEnIz4oye5hHqSq1f2DWp8I6fFB8UvoUU9vmKnliZG6Iio3luv+lzLj9YkNPinvoXpjpTfMOiyFUVIaZqWxwWeTObV0ig0+zIa5CGN5PGKo1aXtkmGY8aEYrZgNM9XlhnQYDXNBWrEaZvIuGQZumAt6CV1mfKCWhQG4IhYQG3z+BuKDDl0yDKmxeg1zUiydlsIoI8kXsZDY4JNsmPVaCqMkVsQCX8IeT2IzXpMuGSaxIharVaJh1qVLhok1zAVrFW+Y9VsKo0S+EIuc7gOiP1Dr0yXDRFbEwrWKxgcdl8IooYa5eGN51vo3aJi1XAqjhFZEAq3CDbOeS2GUoAYsODb4+A3zgubTfcAwbFG8hD3qBkSsEINmi0irYcPc1XfPidLZPEBnrEHDvKD/cA94emiMTCvX3Ty7oGeJxWDLrZBpNVp5ovH6DHLHrVB8HY5WKhsj1GeXYOthvVI4G8/Wqc8tzfpIkWyZK9QLdjTPAb7aoGAm3DCbAAAAAElFTkSuQmCC"
                ></img>
                <div className="flex justify-center"> Connect Your Drive</div>
              </Card>
            )}

            {isGdriveConnected ? (
              <DoneIcon color="success" />
            ) : (
              <WarningIcon color="warning" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
