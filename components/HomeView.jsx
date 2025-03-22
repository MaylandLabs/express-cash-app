import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { FONTS, images } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollViewTopMask from './ScrollViewTopMask';
import { useAppDispatch } from '../store';
import { getUserAsync } from '../store/actions/auth';
import { useSelector } from 'react-redux';

const MOCK_LOAN_DATA = {
  amount: 75000,
  date: '19 junio 2023',
  totalInstallments: 10,
  completedInstallments: 8,
  status: 'Al día',
  progressPercentage: '50%'
};

const ProgressBar = () => {
  const segments = Array(MOCK_LOAN_DATA.totalInstallments).fill(null);

  return (
    <View className="w-full">
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-white" style={{ fontFamily: FONTS.REGULAR }}>Cuotas pagadas</Text>
        <Text className="text-sm text-[#7CBA47]" style={{ fontFamily: FONTS.MEDIUM }}>{MOCK_LOAN_DATA.progressPercentage}</Text>
      </View>
      <View className="flex-row gap-1 mt-1">
        {segments.map((_, index) => (
          <View
            key={index}
            className={`flex-1 rounded h-8 ${
              index < MOCK_LOAN_DATA.completedInstallments ? 'bg-[#7CBA47]' : 'bg-[#044454]'
            }`}
          />
        ))}
      </View>
      <View className="flex-row mt-1">
        <Text className="text-sm text-ex-secondary mt-1" style={{ fontFamily: FONTS.SEMIBOLD }}>
          {MOCK_LOAN_DATA.completedInstallments}
        </Text>
        <Text className="text-sm text-white mt-1 opacity-60" style={{ fontFamily: FONTS.REGULAR }}>
          /{MOCK_LOAN_DATA.totalInstallments}
        </Text>
      </View>
    </View>
  );
};

const HomeView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(getUserAsync());
    }
  }, [user]);

  return (
    <LinearGradient
      colors={['#055B72', '#004C5E']}
      className="flex-1"
      style={{ paddingTop: insets.top , paddingBottom: insets.bottom}}
    >
        <Pressable
          onPress={() => router.push('/profile')}
          className="flex-row items-center gap-3 pl-4 my-1 "
        >
            <Image
              source={images.userr_icon}
              className="w-8 h-8"
              resizeMode="contain"
            />
            <Text className="text-lg text-white" style={{ fontFamily: FONTS.MEDIUM }}>Hola, {user ? user.first_name : "Félix"}</Text>
            <ArrowRight size={18} color="white" />
        </Pressable>

      <View className="flex-1">
        <ScrollViewTopMask>
          <ScrollView className="flex-1 px-4 mt-2">
            {/* Loan Section */}
              <View className="bg-[#055B72] px-4 py-6 rounded-2xl flex-1  h-[340px] overflow-hidden relative mt-6">
                <View className="flex-1">
                  <Text className="text-sm text-white mt-2" style={{ fontFamily: FONTS.REGULAR }}>Pedí tu préstamo de hasta</Text>
                  <Text className="text-[48px] text-white" style={{ fontFamily: FONTS.SEMIBOLD }}>$300.000</Text>
                </View>
                <View className="absolute top-[45%] -left-[20px]">
                  <Image
                    source={images.money_icon}
                    className="w-[210px] h-[210px] "
                    style={{ resizeMode: 'contain' }}
                  />
                </View>
                  <Pressable
                    onPress={() => router.push('/loan')}
                  >
                    <View
                      className="bg-[#7CBA47] py-4 rounded-xl w-full items-center justify-center"
                    >
                      <Text className="text-center text-sm text-[#055B72]" style={{ fontFamily: FONTS.BOLD }}>
                        Pedir un préstamo
                      </Text>
                    </View>
                  </Pressable>
              </View>

            {/* Current Loan Status */}
            <View className="mt-6 mb-40">
              <Text className="text-lg text-white mb-2 mt-2.5" style={{ fontFamily: FONTS.REGULAR }}>Mis préstamos</Text>
              
              <Pressable
                onPress={() => router.push('/myLoans')}
              >
                <View
                  className="bg-ex-primary px-4 py-6 rounded-2xl w-full"
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex items-start">
                      <View className="flex-row items-center">
                        <Text className="text-ex-secondary text-3xl" style={{ fontFamily: FONTS.REGULAR }}>$</Text>
                        <Text className="text-3xl text-white" style={{ fontFamily: FONTS.REGULAR }}>75.000</Text>
                      </View>
                      <Text className="text-sm text-white opacity-60" style={{ fontFamily: FONTS.REGULAR }}>14 junio 2023</Text>
                    </View>
                    <View className="flex items-center">
                      <Text className="text-white text-sm text-right opacity-60" style={{ fontFamily: FONTS.REGULAR }}> Al día</Text>
                      <Text className="text-4xl" style={{ fontFamily: FONTS.REGULAR }}>😊</Text>
                    </View>
                  </View>

                  <View className="mt-4">
                    <ProgressBar />
                  </View>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </ScrollViewTopMask>
      </View>
    </LinearGradient>
  );
};

export default HomeView;
