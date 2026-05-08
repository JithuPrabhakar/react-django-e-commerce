from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from users.permissions import IsMerchant
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .permissions import IsProductOwner
from rest_framework.filters import SearchFilter


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['price', 'stock']
    ordering_fields = ['price', 'created_at']
    search_fields = ['name', 'description'] # /api/products/?search=laptop

    def get_permissions(self):
        if self.action in ['create']:
            return [IsMerchant()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsMerchant(), IsProductOwner()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)